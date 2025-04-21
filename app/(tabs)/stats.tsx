import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

export default function Stats() {
    const [categoryData, setCategoryData] = useState([]);
    const [top5Most, setTop5Most] = useState([]);
    const [top5Least, setTop5Least] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchStats = async () => {
            const user_id = await AsyncStorage.getItem('user_id');
            if (!user_id) return;

            try {
                const res = await fetch(`http://18.226.82.202:3000/expenses/stats/${user_id}/${year}/${month}`);
                const data = await res.json();

                const chartData = data.categories.map((item: any, index: number) => ({
                    name: item.category,
                    amount: Number(item.total),
                    color: chartColors[index % chartColors.length],
                    legendFontColor: '#fff',
                    legendFontSize: 14,
                }));

                setCategoryData(chartData);
                setTop5Most(data.top5Most || []);
                setTop5Least(data.top5Least || []);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [month, year]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Monthly Expense Breakdown</Text>

            {categoryData.length > 0 ? (
                <PieChart
                    data={categoryData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1e1e1e',
                        backgroundGradientFrom: '#1e1e1e',
                        backgroundGradientTo: '#1e1e1e',
                        decimalPlaces: 2,
                        color: () => '#fff',
                        labelColor: () => '#fff',
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    center={[10, 0]}
                />
            ) : (
                <Text style={styles.noDataText}>No expense data available for this month.</Text>
            )}

            <Text style={styles.sectionTitle}>Top 5 Most Expensive Categories</Text>
            {top5Most.map((item: any, index: number) => (
                <Text key={index} style={styles.listItem}>
                    • {item.category}: ${parseFloat(item.total).toFixed(2)}
                </Text>
            ))}

            <Text style={styles.sectionTitle}>Top 5 Least Expensive Categories</Text>
            {top5Least.map((item: any, index: number) => (
                <Text key={index} style={styles.listItem}>
                    • {item.category}: ${parseFloat(item.total).toFixed(2)}
                </Text>
            ))}
        </ScrollView>
    );
}

const chartColors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#1abc9c'];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: '600',
    },
    listItem: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 5,
    },
    noDataText: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    },
});
