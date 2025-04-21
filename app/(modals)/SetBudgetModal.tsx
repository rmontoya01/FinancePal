import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import Input from '@/components/Input';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const SetBudgetModal = () => {
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    if (!user_id || !amount || isNaN(Number(amount))) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    try {
      const res = await fetch('http://18.226.82.202:3000/set-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id,
          monthly_budget: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (data?.status === 'success') {
        router.push({ pathname: '/(tabs)/budget' }); // ✅ this triggers fetchBudget in Budget.tsx
      } else {
        Alert.alert('Error', 'Failed to save budget.');
      }
    } catch (error) {
      console.error('Error saving budget:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Typo size={22} fontWeight="600">Set Monthly Budget</Typo>

        <Input
          placeholder="Enter budget amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Button onPress={handleSubmit}>
          <Typo color="white">Save Budget</Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default SetBudgetModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
});
