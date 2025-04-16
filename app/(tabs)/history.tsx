import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Header from "@/components/Header";
import { spacingY } from '@/constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Entry {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  created_at: string;
}

export default function History() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [sortAscending, setSortAscending] = useState(false);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const user_id = await AsyncStorage.getItem('user_id');
      if (!user_id) return;

      try {
        // Fetch entries
        const entriesRes = await fetch(`http://18.226.82.202:3000/entries/${user_id}`);
        const entriesData = await entriesRes.json();
        setEntries(entriesData);

        // Fetch total balance
        const balanceRes = await fetch(`http://18.226.82.202:3000/budget-summary/${user_id}`);
        const balanceData = await balanceRes.json();
        setBalance(balanceData.total_balance || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  // Calculate running balance from sorted entries
  const entriesWithBalance = sortedEntries.reduce((acc: any[], curr) => {
    const previousBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    const amount = Number(curr.amount);
    const newBalance = curr.type === 'income' ? previousBalance + amount : previousBalance - amount;
    acc.push({ ...curr, balance: newBalance });
    return acc;
  }, []);

  const renderItem = ({ item }: { item: Entry & { balance: number } }) => (
    <View style={styles.entryItem}>
      <Text style={styles.entryType}>
        {item.type.toUpperCase()}: {item.type === 'income' ? '+' : '-'}${Number(item.amount).toFixed(2)}
      </Text>
      <Text style={styles.balanceText}>BALANCE: ${item.balance.toFixed(2)}</Text>
      <Text style={styles.entryDescription}>{item.description}</Text>
      <Text style={styles.entryCategory}>{item.category}</Text>
      <Text style={styles.entryDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="History" style={styles.headerSpacing} />

      {/* Total Balance Display */}
      <View style={styles.totalBalanceCard}>
        <Text style={styles.totalBalanceLabel}>Total Balance</Text>
        <Text style={styles.totalBalanceValue}>${balance.toFixed(2)}</Text>
      </View>

      {/* Sort Button */}
      <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
        <Text style={styles.sortButtonText}>
          Sort by Date {sortAscending ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={entriesWithBalance}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerSpacing: {
    marginTop: spacingY._20,
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
});
