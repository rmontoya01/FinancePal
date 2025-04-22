import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/Header';
import dayjs from 'dayjs';

const screenWidth = Dimensions.get('window').width;

export default function StatsScreen() {
    const [userId, setUserId] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(dayjs());
    const [statsData, setStatsData] = useState<any>(null);

    const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i));

    useEffect(() => {
        const fetchUserAndData = async () => {
            const id = await AsyncStorage.getItem('user_id');
            if (!id) return;
            setUserId(id);
            fetchStats(id, selectedMonth.year(), selectedMonth.month() + 1);
        };
        fetchUserAndData();
    }, [selectedMonth]);

    const fetchStats = async (id: string, year: number, month: number) => {
        try {
            const res = await fetch(`http://18.226.82.202:3000/expenses/stats/${id}/${year}/${month}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setStatsData(data);
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    const pieData = statsData?.categories?.map((item: any, idx: number) => ({
        name: item.description,
        population: Number(item.percentage),
        color: `hsl(${idx * 40}, 70%, 60%)`,
        legendFontColor: '#fff',
        legendFontSize: 12,
    })) || [];

    return (
        <View style={styles.container}>
            <Header title="Stats" />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={[styles.monthSelector, (statsData?.categories?.length ?? 0) === 0 && { height: 0 }]}
                contentContainerStyle={{ height: '10%' }}

            >
                {months.map((m, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedMonth(m)}
                        style={[
                            styles.monthButton,
                            selectedMonth.month() === index && styles.selectedMonthButton,
                            (statsData?.categories?.length ?? 0) === 0 && { opacity: 0.5 },
                        ]}
                    >
                        <Text style={styles.monthText}>{m.format('MMM')}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {pieData.length > 0 && (
                <>
                    <PieChart
                        data={pieData}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#000',
                            backgroundGradientFrom: '#1e1e1e',
                            backgroundGradientTo: '#3b3b3b',
                            color: () => '#fff',
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                    <Text style={styles.sectionTitle}>Top 5 Categories</Text>
                    <FlatList
                        data={statsData.top}
                        keyExtractor={(item, index) => `${item.description}-${index}`}
                        renderItem={({ item }) => (
                            <Text style={styles.itemText}>
                                {item.description}: ${item.amount.toFixed(2)} ({item.percentage.toFixed(1)}%)
                            </Text>
                        )}
                    />

                    <Text style={styles.sectionTitle}>Bottom 5 Categories</Text>
                    <FlatList
                        data={statsData.bottom}
                        keyExtractor={(item, index) => `${item.description}-${index}`}
                        renderItem={({ item }) => (
                            <Text style={styles.itemText}>
                                {item.description}: ${item.amount.toFixed(2)} ({item.percentage.toFixed(1)}%)
                            </Text>
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    monthSelector: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    monthButton: {
        padding: 10,
        backgroundColor: '#444',
        marginRight: 8,
        borderRadius: 10,
    },
    selectedMonthButton: {
        backgroundColor: '#6a0dad',
    },
    monthText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sectionTitle: {
        marginTop: 20,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    itemText: {
        color: '#ccc',
        fontSize: 15,
        marginVertical: 4,
    },
});
