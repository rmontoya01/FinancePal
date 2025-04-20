import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenWrapper from '@/components/ScreenWrapper';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors } from '@/constants/themes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import BudgetCard from '@/components/BudgetCard';

const HomeScreen = () => {
  const router = useRouter();
  const isFocused = useIsFocused();

  const [username, setUsername] = useState<string>('User');
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
        console.log("Fetched username:", storedUsername);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchBudgetData = async () => {
      const user_id = await AsyncStorage.getItem('user_id');
      if (!user_id) return;

      try {
        const response = await fetch(`http://18.226.82.202:3000/budget-summary/${user_id}`);
        const data = await response.json();

        setIncome(Number(data.total_income) || 0);
        setExpense(Number(data.total_expense) || 0);
        setBalance(Number(data.total_balance) || 0);
      } catch (error) {
        console.error('Error fetching budget summary:', error);
      }
    };

    if (isFocused) {
      fetchBudgetData();
    }
  }, [isFocused]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ gap: 5, marginTop: spacingY._5, alignItems: 'center' }}>
            <Typo size={30} color={colors.primaryLight} fontWeight={"500"}>Welcoeme</Typo>
            <Typo size={32} fontWeight={"600"}>{username}</Typo>
          </View>
          <TouchableOpacity style={styles.settingsIcon} onPress={() => router.push('/(auth)/settings')}>
            <Ionicons name="settings-sharp" size={24} color={colors.neutral200} weight={"bold"} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <View>
            <BudgetCard income={income} expense={expense} balance={balance} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._25,
    marginTop: verticalScale(20),
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._50,
  },
  settingsIcon: {
    flexDirection: 'row-reverse',
    alignContent: 'flex-end',
    backgroundColor: colors.neutral800,
    padding: spacingX._7,
    borderRadius: 40,
  },
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(90),
    gap: spacingY._20,
  },
});
