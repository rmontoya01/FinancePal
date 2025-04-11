import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router';

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors, radius } from '@/constants/themes';
import Input from '@/components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PieChart } from 'react-native-chart-kit';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";
import Header from "@/components/Header";
// import SegmentControl from "@react-native-segmented-control/segment-control";


const Stats = () => {
    // Hardcoded data
    const statsData = [
        { category: 'Food', budgeted: 300, spent: 420, difference: -120 },
        { category: 'Transport', budgeted: 150, spent: 130, difference: 20 },
        { category: 'Entertainment', budgeted: 100, spent: 160, difference: -60 },
        { category: 'Utilities', budgeted: 200, spent: 180, difference: 20 },
        { category: 'Shopping', budgeted: 250, spent: 310, difference: -60 },
    ];

    const pieData = statsData.map((item, index) => ({
        name: item.category,
        amount: item.spent,
        color: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'][index % 5],
        legendFontColor: '#7F7F7F',
        legendFontSize: 14,
    }));

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={{ gap: 5, marginTop: spacingY._5, alignItems: 'center' }}>
                    <Header title="Stats" style={{ marginVertical: spacingY._5 }} />
                </View>

                <ScrollView contentContainerStyle={{
                    gap: spacingY._12,
                    paddingTop: spacingY._7,
                    paddingBottom: spacingY._12,
                }}
                    showsVerticalScrollIndicator={false}>

                    <Text style={styles.text}>Pie Chart: Spending by Category</Text>
                    <PieChart
                        data={pieData}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                        style={{ alignSelf: 'center' }}
                    />

                    <Text style={styles.text}>Budget vs Actual (Category View)</Text>
                    <View style={styles.containerText}>
                        {statsData.map((item, index) => (
                            <Text key={index} style={styles.itemText}>
                                {item.category}: Budgeted ${item.budgeted.toFixed(2)} / Spent ${item.spent.toFixed(2)} — {item.difference < 0 ? 'Over' : 'Under'} by ${Math.abs(item.difference).toFixed(2)}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.text}>Top Over-Budget Categories</Text>
                    <View style={styles.containerText}>
                        {statsData
                            .filter(item => item.difference < 0)
                            .sort((a, b) => a.difference - b.difference)
                            .slice(0, 5)
                            .map((item, index) => (
                                <Text key={index} style={styles.itemText}>
                                    {item.category} - Overspent by ${Math.abs(item.difference).toFixed(2)}
                                </Text>
                            ))}
                    </View>
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default Stats;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacingX._15,
        paddingVertical: spacingY._7,
        gap: spacingY._12,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.neutral200,
    },
    containerText: {
        backgroundColor: 'lightblue',
        padding: 20,
        width: '100%',
        borderRadius: 20,
        gap: 10,
    },
    itemText: {
        fontSize: 16,
        color: '#000',
    },
});
