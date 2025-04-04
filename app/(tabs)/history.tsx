import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import { spacingY } from '@/constants/themes';

export default function History() {
  interface Transaction {
    category: string;
    amount: number;
  }

  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1; // getMonth() returns 0-based month

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://18.226.82.202:3000/transactions/history/${year}/${month}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="History Screen Page" style={{ marginVertical: spacingY._5 }} />
      <View style={styles.containerText}>
        <Text style={styles.headerText}>Transaction History</Text>

        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text style={styles.listText}>
                {item.category}: ${item.amount}
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    backgroundColor: 'lightblue',
    padding: 50,
    height: 500,
    width: 250,
    marginTop: "10%",
    borderRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listText: {
    backgroundColor: "red",
    fontSize: 20,
    fontStyle: 'italic',
    padding: 5,
    marginVertical: 3,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});