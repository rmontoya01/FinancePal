import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '@/components/Header';
import { spacingY } from '@/constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';

interface Entry {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  created_at: string;
  balance?: number;
}

export default function History() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [sortAscending, setSortAscending] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [inputUsername, setInputUsername] = useState('');

  const fetchData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    if (!user_id) return;

    try {
      const entriesRes = await fetch(`http://18.226.82.202:3000/entries/${user_id}`);
      const entriesData = await entriesRes.json();
      setEntries(entriesData);

      const balanceRes = await fetch(`http://18.226.82.202:3000/budget-summary/${user_id}`);
      const balanceData = await balanceRes.json();
      setBalance(balanceData.total_balance || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  const deleteEntry = async (id: number, type: string) => {
    try {
      const res = await fetch(`http://18.226.82.202:3000/entries/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        Alert.alert('Error', 'Failed to delete entry.');
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const resetMonth = () => {
    setShowVerifyModal(true);
  };

  const resetMonthConfirmed = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    if (!user_id) return;

    const month = dayjs().month() + 1;
    const year = dayjs().year();

    try {
      const res = await fetch(`http://18.226.82.202:3000/entries/month/${user_id}/${year}/${month}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchData();
      else Alert.alert('Error', 'Could not reset entries.');
    } catch (err) {
      console.error('Reset error:', err);
    }
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  const entriesWithBalance = sortedEntries.reduce((acc: Entry[], curr) => {
    const prev = acc.length ? acc[acc.length - 1].balance || 0 : 0;
    const amt = Number(curr.amount);
    const updated = curr.type === 'income' ? prev + amt : prev - amt;
    acc.push({ ...curr, balance: updated });
    return acc;
  }, []);

  const renderItem = ({ item }: { item: Entry }) => {
    const parsedAmount = Number(item.amount);
    const safeAmount = isNaN(parsedAmount) ? 0 : parsedAmount;

    return (
      <View style={styles.entryItem}>
        <Text style={styles.entryType}>
          {item.type.toUpperCase()}: {item.type === 'income' ? '+' : '-'}${safeAmount.toFixed(2)}
        </Text>
        <Text style={styles.balanceText}>BALANCE: ${item.balance?.toFixed(2)}</Text>
        <Text style={styles.entryDescription}>{item.description}</Text>
        <Text style={styles.entryCategory}>{item.category}</Text>
        <Text style={styles.entryDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
        <TouchableOpacity onPress={() => deleteEntry(item.id, item.type)}>
          <Text style={{ color: '#ff4d4d', marginTop: 6 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="History" style={styles.headerSpacing} />

      <View style={styles.totalBalanceCard}>
        <Text style={styles.totalBalanceLabel}>Total Balance</Text>
        <Text style={styles.totalBalanceValue}>${balance.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
        <Text style={styles.sortButtonText}>
          Sort by Date {sortAscending ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetMonth} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset All Entries (This Month)</Text>
      </TouchableOpacity>

      <FlatList
        data={entriesWithBalance}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContainer}
      />

      {showVerifyModal && (
        <TouchableWithoutFeedback onPress={() => setShowVerifyModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <KeyboardAvoidingView behavior="padding" style={styles.modalBox}>
                <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>
                  Enter your username to confirm reset:
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#aaa"
                  onChangeText={setInputUsername}
                  value={inputUsername}
                />
                <TouchableOpacity
                  onPress={async () => {
                    const stored = await AsyncStorage.getItem('username');
                    if (stored && inputUsername.trim().toLowerCase() === stored.toLowerCase()) {
                      setShowVerifyModal(false);
                      setInputUsername('');
                      resetMonthConfirmed();
                    } else {
                      Alert.alert('Error', 'Username does not match');
                    }
                  }}
                  style={styles.modalConfirmButton}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 40,
  },
  headerSpacing: {
    marginBottom: 10,
  },
  totalBalanceCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
  },
  totalBalanceLabel: {
    fontSize: 18,
    color: '#b0b0b0',
    fontWeight: '600',
  },
  totalBalanceValue: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  sortButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#3b3b3b',
    borderRadius: 5,
  },
  sortButtonText: {
    color: '#fff',
  },
  resetButton: {
    alignSelf: 'center',
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#8B0000',
    borderRadius: 6,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  entryItem: {
    backgroundColor: '#3b3b3b',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  entryType: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  balanceText: {
    color: '#89d489',
    fontSize: 15,
    marginTop: 4,
  },
  entryDescription: {
    color: '#ccc',
    marginTop: 5,
  },
  entryCategory: {
    color: '#aaa',
  },
  entryDate: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBox: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    backgroundColor: '#555',
    color: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  modalConfirmButton: {
    backgroundColor: '#8B0000',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
});
