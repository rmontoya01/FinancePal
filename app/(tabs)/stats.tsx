import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
import Header from '@/components/Header';

const screenWidth = Dimensions.get('window').width;

const Stats = () => {
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
    const [statsData, setStatsData] = useState<{ category: string; spent: number; percent: number }[]>([]);
    const [topOver, setTopOver] = useState<{ category: string; spent: number }[]>([]);
    const [topUnder, setTopUnder] = useState<{ category: string; spent: number }[]>([]);
    const [totalSpent, setTotalSpent] = useState<number>(0);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const fetchStats = async (year: number, month: number) => {
        const user_id = await AsyncStorage.getItem('user_id');
        if (!user_id) return;

        try {
            const res = await fetch(`http://18.226.82.202:3000/expenses/stats/${user_id}/${year}/${month + 1}`);
            const text = await res.text(); // change to text for debugging
            console.log('Raw response from backend:', text);
            const json = await res.json();
            setStatsData(json.categories);
            setTopOver(json.topOverspent);
            setTopUnder(json.topUnderspent);
            setTotalSpent(json.totalSpent);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchStats(selectedYear, selectedMonth);
    }, [selectedMonth]);

    const pieData = statsData.map((item, index) => ({
        name: item.category,
        amount: item.spent,
        color: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'][index % 5],
        legendFontColor: '#fff',
        legendFontSize: 14,
    }));

    return (
        <View style={styles.container}>
            <Header title="Stats" style={styles.headerSpacing} />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.monthScroll}>
                {months.map((month, index) => (
                    <TouchableOpacity
                        key={month}
                        style={[styles.monthButton, index === selectedMonth && styles.selectedMonthButton]}
                        onPress={() => setSelectedMonth(index)}
                    >
                        <Text style={styles.monthText}>{month}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.chartSection}>
                    <Text style={styles.sectionTitle}>Spending by Category</Text>
                    {pieData.length > 0 ? (
                        <PieChart
                            data={pieData}
                            width={screenWidth - 40}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#000',
                                backgroundGradientFrom: '#1e1e1e',
                                backgroundGradientTo: '#1e1e1e',
                                color: () => `#fff`,
                                labelColor: () => '#fff',
                                decimalPlaces: 2,
                            }}
                            accessor="amount"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                            style={{ alignSelf: 'center' }}
                        />
                    ) : (
                        <Text style={{ color: '#888', alignSelf: 'center' }}>No data available</Text>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Category % of Total</Text>
                    {statsData.map((item, idx) => (
                        <Text key={idx} style={styles.itemText}>
                            {item.category}: ${item.spent.toFixed(2)} ({item.percent.toFixed(1)}%)
                        </Text>
                    ))}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Top 5 Categories (Most Spent)</Text>
                    {topOver.map((item, idx) => (
                        <Text key={idx} style={styles.itemText}>
                            {item.category} – ${item.spent.toFixed(2)}
                        </Text>
                    ))}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Top 5 Categories (Least Spent)</Text>
                    {topUnder.map((item, idx) => (
                        <Text key={idx} style={styles.itemText}>
                            {item.category} – ${item.spent.toFixed(2)}
                        </Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Stats;

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
    scrollContainer: {
        paddingBottom: 40,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    chartSection: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#3b3b3b',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 10,
    },
    itemText: {
        color: '#ccc',
        marginBottom: 8,
    },
    monthScroll: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    monthButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 8,
        backgroundColor: '#3b3b3b',
        borderRadius: 20,
    },
    selectedMonthButton: {
        backgroundColor: '#6c63ff',
    },
    monthText: {
        color: '#fff',
        fontSize: 14,
    },
});
