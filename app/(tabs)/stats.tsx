import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
import Header from '@/components/Header';
import { spacingX, spacingY } from '@/constants/themes';

const screenWidth = Dimensions.get('window').width;

const Stats = () => {
    interface StatsItem {
        category: string;
        spent: number;
        budgeted: number;
        difference: number;
    }

    const [statsData, setStatsData] = useState<StatsItem[]>([]);
    const [userId, setUserId] = useState<string | null>(null);



    useEffect(() => {
        const fetchStats = async () => {
            const userId = await AsyncStorage.getItem('user_id');
            if (!userId) return;

            try {
                const res = await fetch(`http://18.191.240.219:3000/expenses/stats/${userId}`);
                const json = await res.json();
                setStatsData(json);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

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

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Budget vs Actual</Text>
                    {statsData.map((item, idx) => (
                        <Text key={idx} style={styles.itemText}>
                            {item.category}: Budget ${item.budgeted.toFixed(2)} / Spent ${item.spent.toFixed(2)} – {item.difference < 0 ? 'Over' : 'Under'} by ${Math.abs(item.difference).toFixed(2)}
                        </Text>
                    ))}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Top Over-Budget Categories</Text>
                    {statsData
                        .filter(item => item.difference < 0)
                        .sort((a, b) => a.difference - b.difference)
                        .slice(0, 5)
                        .map((item, idx) => (
                            <Text key={idx} style={styles.itemText}>
                                {item.category} – Overspent by ${Math.abs(item.difference).toFixed(2)}
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
});
