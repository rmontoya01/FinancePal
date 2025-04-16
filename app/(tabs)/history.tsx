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
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const user_id = await AsyncStorage.getItem('user_id');
      if (!user_id) return;

      try {
        const response = await fetch(`http://18.226.82.202:3000/entries/${user_id}`);
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, []);

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  const renderItem = ({ item }: { item: Entry }) => (
    <View style={styles.entryItem}>
      <Text style={styles.entryType}>{item.type.toUpperCase()}</Text>
      <Text style={styles.entryAmount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.entryCategory}>{item.category}</Text>
      <Text style={styles.entryDescription}>{item.description}</Text>
      <Text style={styles.entryDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="History" style={{ marginVertical: spacingY._5 }} />
      <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
        <Text style={styles.sortButtonText}>
          Sort by Date {sortAscending ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={sortedEntries}
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
    paddingTop: 20,
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
  },
  entryAmount: {
    color: '#fff',
  },
  entryCategory: {
    color: '#ccc',
  },
  entryDescription: {
    color: '#ccc',
  },
  entryDate: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
  },
});
