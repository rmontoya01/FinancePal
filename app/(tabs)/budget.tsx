import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import Button from '@/components/Button';
import { spacingY, spacingX, colors } from '@/constants/themes';

const Budget = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState({
    budget_limit: 0,
    total_spent: 0,
    remaining: 0,
    percentage: 0,
  });

  const fetchBudget = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const res = await fetch(`http://18.226.82.202:3000/user-budget/${user_id}`);
      const data = await res.json();

      if (res.status === 200 && data.budget_limit !== undefined) {
        setBudgetData({
          ...data,
          budget_limit: parseFloat(data.budget_limit),
          total_spent: parseFloat(data.total_spent),
          remaining: parseFloat(data.remaining),
          percentage: parseFloat(data.percentage),
        });
      } else {
        console.error('Error fetching budget:', data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBudget();
    }, [])
  );

  const overBudget = budgetData.remaining < 0;
  const fillPercent = Math.min(budgetData.percentage, 100);

  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScreenWrapper>
        <View style={styles.container}>
          <Typo size={30} fontWeight="700" color={colors.white} style={{ marginBottom: spacingY._15 }}>
            Budget Overview
          </Typo>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <>
              <View style={styles.card}>
                <AnimatedCircularProgress
                  size={170}
                  width={15}
                  fill={fillPercent}
                  tintColor={overBudget ? colors.red : '#00e0ff'}
                  backgroundColor="#3d5875"
                  rotation={0}
                >
                  {() => (
                    <Typo size={20} fontWeight="600" color={colors.white}>
                      {budgetData.percentage.toFixed(0)}%
                    </Typo>
                  )}
                </AnimatedCircularProgress>

                <View style={styles.budgetDetails}>
                  <Typo size={16} color={colors.white}>Monthly Limit: ${budgetData.budget_limit.toFixed(2)}</Typo>
                  <Typo size={16} color={colors.red}>Spent: ${budgetData.total_spent.toFixed(2)}</Typo>
                  <Typo size={16} color={colors.green}>Remaining: ${budgetData.remaining.toFixed(2)}</Typo>

                  {overBudget && (
                    <Typo size={14} color={colors.red} fontWeight="600">
                      ⚠ You are over budget!
                    </Typo>
                  )}
                </View>
              </View>

              <View style={styles.actions}>
                <Button onPress={() => router.push({ pathname: '/(modals)/SetBudgetModal' })}>
                  <Typo color="white" size={16}>Set Budget</Typo>
                </Button>

                <Button onPress={() => router.push({ pathname: '/(modals)/incomeModal' })}>
                  <Typo color="white" size={16}>Add Income</Typo>
                </Button>

                <Button onPress={() => router.push({ pathname: '/(modals)/spendingsModal' })}>
                  <Typo color="white" size={16}>Add Expense</Typo>
                </Button>
              </View>
            </>
          )}
        </View>
      </ScreenWrapper>
    </LinearGradient>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    gap: spacingY._20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: spacingY._20,
    width: '100%',
  },
  budgetDetails: {
    marginTop: spacingY._15,
    gap: spacingY._7,
    alignItems: 'center',
  },
  actions: {
    marginTop: spacingY._20,
    gap: spacingY._15,
    width: '100%',
  },
});
