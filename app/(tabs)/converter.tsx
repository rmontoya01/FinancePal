import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import Typo from '@/components/Typo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/constants/themes'
import { Picker } from '@react-native-picker/picker'

import Freecurrencyapi from '@everapi/freecurrencyapi-js'
// API Key: keep it secret
import Constants from 'expo-constants';
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

    // Fetching the currency list
    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                // const freecurrencyapi = new Freecurrencyapi(API_KEY);
                const response = await fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                //console.log('API Response:', data);

                if (data && data.data) {
                    const currencyList = Object.keys(data.data);
                    setCurrencies(currencyList);
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.log("Error fetching currencies:", error);
            }
        };

        fetchCurrency();
    }, []);

    // Fetching the exchange rate
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Exchange Rate Response:', data);

                if (data && data.data && data.data[toCurrency]) {
                    setExchangeRate(data.data[toCurrency]);
                } else {
                    console.error('Exchange rate not found:', data);
                }

            } catch (error) {
                console.log('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    return (
        <ScreenWrapper>
            <Header title="Currency Converter Page" />

            <View style={styles.container}>
                <View style={styles.containerContent}>
                    <Ionicons style={styles.containerIcon} name="cash-sharp" size={40} color="black" />
                    <Typo size={20} fontWeight={"600"}>Currency Converter</Typo>

                    {/* Amount Input */}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setAmount(parseFloat(text) || 0)}
                        value={amount.toString()}
                        keyboardType='numeric'
                        returnKeyType="done"
                        placeholder="Enter Amount"
                    />

                    {/* Currency Pickers */}
                    <View style={styles.containerPicker}>
                        <Picker
                            style={styles.picker}
                            selectedValue={fromCurrency}
                            onValueChange={(itemValue) => setFromCurrency(itemValue)}>
                            {currencies.map((currency, index) => (
                                <Picker.Item key={index} label={currency} value={currency} />
                            ))}
                        </Picker>

                        <Picker
                            style={styles.picker}
                            selectedValue={toCurrency}
                            onValueChange={(itemValue) => setToCurrency(itemValue)}>
                            {currencies.map((currency, index) => (
                                <Picker.Item key={index} label={currency} value={currency} />
                            ))}
                        </Picker>

                        {/* Display the Result */}
                        <View style={styles.result}>
                            <Text style={styles.resultText}>
                                {amount} {fromCurrency} = {currencyConverter()} {toCurrency}
                            </Text>
                        </View>

                    </View>

                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Converter

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerContent: {
        backgroundColor: colors.neutral600,
        padding: 25,
        height: 666,
        width: 350,
        borderRadius: 30,
        marginTop: 10,
    },
    input: {
        backgroundColor: colors.neutral200,
        padding: 10,
        margin: 10,
        borderRadius: 20,
    },
    containerPicker: {
        backgroundColor: colors.neutral200,
        padding: 10,
        margin: 5,
        borderRadius: 20,
        paddingBlock: 10,
        paddingInline: 10,
    },
    picker: {
        backgroundColor: colors.neutral200,
    },
    result: {
        backgroundColor: colors.neutral900,
        padding: 5,
        margin: 5,
        borderRadius: 5,
    },
    resultText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

