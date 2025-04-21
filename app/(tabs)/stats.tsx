import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
import Header from '@/components/Header';
import { spacingX, spacingY } from '@/constants/themes';

const screenWidth = Dimensions.get('window').width;

const Stats = () => {
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
    const [userId, setUserId] = useState<string | null>(null);
    const [statsData, setStatsData] = useState<any[]>([]); // Ensure it's initialized as an empty array

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const fetchStats = async () => {
        const user_id = await AsyncStorage.getItem('user_id');
        if (!user_id) return;
        setUserId(user_id);

        try {
            const res = await fetch(`http://18.226.82.202:3000/expenses/stats/${user_id}`);
            const json = await res.json();
            console.log('Stats Data:', json); // Log the fetched stats data for debugging
            setStatsData(json);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    // Check if statsData is an array and filter safely
    const filteredStats = Array.isArray(statsData)
        ? statsData.filter((item) => item.year === selectedYear && item.month === selectedMonth + 1)
        : [];

    // Log filtered stats for debugging
    console.log('Filtered Stats:', filteredStats);

    // Calculate total spending for the selected month
    const totalSpent = filteredStats.reduce((total, item) => total + item.spent, 0);

    // Prepare data for pie chart (percentage)
    const pieData = filteredStats.map((item: any, index: number) => ({
        name: item.category,
        amount: (item.spent / totalSpent) * 100, // Calculate percentage
        color: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'][index % 5],
        legendFontColor: '#fff',
        legendFontSize: 14,
    }));

    return (
        <View style={styles.container}>
            <Header title="Stats" style={styles.headerSpacing} />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.monthScroll}
            >
                {months.map((month, index) => (
                    <TouchableOpacity
                        key={month}
                        style={[
                            styles.monthButton,
                            index === selectedMonth && styles.selectedMonthButton,
                        ]}
                        onPress={() => {
                            setSelectedMonth(index);
                        }}
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
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
            </ScrollView>
        </View>
    );
};

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

export default Stats;
