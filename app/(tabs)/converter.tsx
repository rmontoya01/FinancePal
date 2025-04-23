import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import Typo from '@/components/Typo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/constants/themes'
import { Picker } from '@react-native-picker/picker'

import Freecurrencyapi from '@everapi/freecurrencyapi-js'
import Constants from 'expo-constants';
import { scale } from '@/utils/styling'

const API_KEY = Constants.expoConfig?.extra?.CURRENCY_API_KEY || process.env.CURRENCY_API_KEY;

const Converter = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(0);
    const [amount, setAmount] = useState(1);
    const [currencies, setCurrencies] = useState<string[]>([]);

    const currencyConverter = () => {
        let result = (amount * exchangeRate).toFixed(2);
        return result;
    };

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const response = await fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (data && data.data) {
                    const currencyList = Object.keys(data.data);
                    setCurrencies(currencyList);
                }
            } catch (error) {
                console.log("Error fetching currencies:", error);
            }
        };
        fetchCurrency();
    }, []);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (data?.data?.[toCurrency]) {
                    setExchangeRate(data.data[toCurrency]);
                }
            } catch (error) {
                console.log('Error fetching exchange rate:', error);
            }
        };
        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="cash-sharp" size={38} color={colors.white} />
                    <Typo size={23} fontWeight="700" color={colors.white}>Currency Converter</Typo>
                    <Typo size={13} fontWeight="400" color={colors.neutral200}>
                        Exchange rates updated daily
                    </Typo>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setAmount(parseFloat(text) || 0)}
                    value={amount.toString()}
                    keyboardType='numeric'
                    returnKeyType="done"
                    placeholder="Enter Amount"
                    placeholderTextColor="#ccc"
                />

                <View style={styles.containerPicker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={fromCurrency}
                        onValueChange={(itemValue) => setFromCurrency(itemValue)}>
                        {currencies.map((currency, index) => (
                            <Picker.Item key={index} label={currency} value={currency} />
                        ))}
                    </Picker>

                    <View style={{ padding: 1, marginTop: 2, alignItems: 'center' }}>
                        <Button
                            title="Switch"
                            onPress={() => {
                                setFromCurrency(toCurrency);
                                setToCurrency(fromCurrency);
                            }}
                        />
                    </View>

                    <Picker
                        style={styles.picker}
                        selectedValue={toCurrency}
                        onValueChange={(itemValue) => setToCurrency(itemValue)}>
                        {currencies.map((currency, index) => (
                            <Picker.Item key={index} label={currency} value={currency} />
                        ))}
                    </Picker>

                    <View style={styles.result}>
                        <Text style={styles.resultText}>
                            {amount} {fromCurrency} = {currencyConverter()} {toCurrency}
                        </Text>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Converter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: colors.neutral200,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        fontSize: 16,
        width: 320,
        marginBottom: 10,
        color: '#000',
    },
    containerPicker: {
        borderRadius: 20,
        backgroundColor: colors.neutral300,
        padding: 8,
        width: 320,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    picker: {
        width: '100%',
        marginVertical: 2,
    },
    result: {
        backgroundColor: colors.neutral800,
        padding: 12,
        marginTop: 8,
        borderRadius: 15,
        alignItems: 'center',
    },
    resultText: {
        color: colors.white,
        fontSize: scale(18),
        fontWeight: 'bold',
    },
});
