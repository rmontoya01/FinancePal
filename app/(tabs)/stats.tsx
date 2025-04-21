import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const monthsList = [
    { name: 'Jan', num: 1 },
    { name: 'Feb', num: 2 },
    { name: 'Mar', num: 3 },
    { name: 'Apr', num: 4 },
    { name: 'May', num: 5 },
    { name: 'Jun', num: 6 },
    { name: 'Jul', num: 7 },
    { name: 'Aug', num: 8 },
    { name: 'Sep', num: 9 },
    { name: 'Oct', num: 10 },
    { name: 'Nov', num: 11 },
    { name: 'Dec', num: 12 },
];

export default function Stats() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [year] = useState(new Date().getFullYear());
    interface PieDataItem {
        category: string;
        amount: number;
    }

    const [pieData, setPieData] = useState<PieDataItem[]>([]);
    interface ExpenseItem {
        category: string;
        amount: number;
        percentage: number;
    }

    const [top5, setTop5] = useState<ExpenseItem[]>([]);
    const [bottom5, setBottom5] = useState<ExpenseItem[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            const user_id = await AsyncStorage.getItem('user_id');
            if (!user_id) return;

            try {
                const res = await fetch(`http://18.226.82.202:3000/expenses/stats/${user_id}/${year}/${selectedMonth}`);
                const data = await res.json();

                setPieData(
                    data.pieData.map((item: PieDataItem, index: number) => ({
                        name: item.category,
                        amount: item.amount,
                        color: getColor(index),
                        legendFontColor: '#fff',
                        legendFontSize: 12,
                    }))
                );
                setTop5(data.top5);
                setBottom5(data.bottom5);
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
        };

        fetchStats();
    }, [selectedMonth]);

    const getColor = (index: number) => {
        const colors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#f77825', '#8dd17e'];
        return colors[index % colors.length];
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Stats</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthScroll}>
                {monthsList.map((m) => (
                    <TouchableOpacity
                        key={m.num}
                        style={[
                            styles.monthButton,
                            selectedMonth === m.num && styles.monthButtonSelected,
                        ]}
                        onPress={() => setSelectedMonth(m.num)}
                    >
                        <Text style={styles.monthText}>{m.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {pieData.length > 0 ? (
                <>
                    <PieChart
                        data={pieData}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: '#1E1E1E',
                            backgroundGradientTo: '#1E1E1E',
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />

                    <Text style={styles.sectionTitle}>Top 5 Expenses</Text>
                    {top5.map((item, idx) => (
                        <Text key={idx} style={styles.itemText}>
                            {item.category}: ${item.amount.toFixed(2)} ({item.percentage}%)
                        </Text>
                    ))}

                    <Text style={styles.sectionTitle}>Bottom 5 Expenses</Text>
                    {bottom5.map((item, idx) => (
                        <Text key={idx} style={styles.itemText}>
                            {item.category}: ${item.amount.toFixed(2)} ({item.percentage}%)
                        </Text>
                    ))}
                </>
            ) : (
                <Text style={styles.emptyText}>No expense data for this month.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        padding: 20,
    },
    title: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    monthScroll: {
        marginBottom: 20,
    },
    monthButton: {
        backgroundColor: '#444',
        borderRadius: 8,
        padding: 10,
        marginRight: 8,
    },
    monthButtonSelected: {
        backgroundColor: '#89d489',
    },
    monthText: {
        color: '#fff',
        fontSize: 14,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        marginTop: 20,
        fontWeight: '600',
    },
    itemText: {
        color: '#ccc',
        fontSize: 14,
        paddingTop: 4,
    },
    emptyText: {
        color: '#aaa',
        fontSize: 16,
        marginTop: 20,
    },
});
