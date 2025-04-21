import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/Header';

const screenWidth = Dimensions.get('window').width;

const chartColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#BA68C8',
    '#FFA726', '#4DD0E1', '#9575CD', '#F06292', '#7986CB',
];

export default function Stats() {
    const [categoryData, setCategoryData] = useState<{ category: string; total: number }[]>([]);
    const [top5Most, setTop5Most] = useState<{ category: string; total: number }[]>([]);
    const [top5Least, setTop5Least] = useState<{ category: string; total: number }[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            const user_id = await AsyncStorage.getItem('user_id');
            if (!user_id) return;

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;

            try {
                const res = await fetch(`http://18.226.82.202:3000/expenses/stats/${user_id}/${year}/${month}`);

                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();

                console.log('Stats Data:', data); // Debug

                setCategoryData(Array.isArray(data.categories) ? data.categories : []);
                setTop5Most(Array.isArray(data.top5Most) ? data.top5Most : []);
                setTop5Least(Array.isArray(data.top5Least) ? data.top5Least : []);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setCategoryData([]);
                setTop5Most([]);
                setTop5Least([]);
            }
        };

        fetchStats();
    }, []);

    const chartData = Array.isArray(categoryData)
        ? categoryData.map((item, index) => ({
            name: item.category,
            amount: Number(item.total),
            color: chartColors[index % chartColors.length],
            legendFontColor: '#fff',
            legendFontSize: 14,
        }))
        : [];

    return (
        <ScrollView style={styles.container}>
            <Header title="Stats" style={styles.headerSpacing} />

            <Text style={styles.sectionTitle}>Expense Categories</Text>
            {chartData.length > 0 ? (
                <PieChart
                    data={chartData}
                    width={screenWidth - 30}
                    height={220}
                    chartConfig={{
                        color: () => `rgba(255, 255, 255, 0.8)`,
                        labelColor: () => '#fff',
                        backgroundGradientFrom: '#1e1e1e',
                        backgroundGradientTo: '#1e1e1e',
                        decimalPlaces: 2,
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            ) : (
                <Text style={styles.noDataText}>No data to display</Text>
            )}

            <Text style={styles.sectionTitle}>Top 5 Most Expensive Categories</Text>
            {top5Most.map((item, index) => (
                <Text key={index} style={styles.itemText}>
                    {item.category}: ${Number(item.total).toFixed(2)}
                </Text>
            ))}

            <Text style={styles.sectionTitle}>Top 5 Least Expensive Categories</Text>
            {top5Least.map((item, index) => (
                <Text key={index} style={styles.itemText}>
                    {item.category}: ${Number(item.total).toFixed(2)}
                </Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    headerSpacing: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    itemText: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 5,
    },
    noDataText: {
        color: '#888',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});
