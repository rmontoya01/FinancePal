import { Alert, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native'
import ScreenWrapper from '@/components/ScreenWrapper' // Adjust the path if necessary
import React, { useState } from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/themes'
import Ionicons from '@expo/vector-icons/Ionicons'
import PreviousButton from '@/components/PreviousButton'
import Header from '@/components/Header'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { IncomeType } from '@/types'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { scale } from '@/utils/styling'

const IncomeModal = () => {

    const { user, updateUserData } = useAuth();

    const { username } = useLocalSearchParams();
    const [show, setShow] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [income, setIncome] = useState<IncomeType>({
        income_id: 0,
        user_id: 0,
        source: "",
        amount: 0,
        month: 0,
        year: 0,
        created_at: new Date(),
        updated_at: new Date()
    });

    const [incomeAmountText, setIncomeAmountText] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async () => {
        let { source } = income;
        const amount = parseFloat(incomeAmountText);

        if (!source.trim() || amount <= 0 || isNaN(amount)) {
            Alert.alert("Income", "Please fill in all of the fields!");
            return;
        }

        const calendarNow = new Date(Date.now());

        const user_id = await AsyncStorage.getItem("user_id");
        if (!user_id) {
            Alert.alert("Income", "User is not logged in.");
            return;
        }

        const data = {
            user_id,
            source,
            amount,
            month: calendarNow.getMonth() + 1,
            year: calendarNow.getFullYear()
        };

        console.log("Submitting data: ", data);

        setLoading(true);
        try {
            const response = await fetch('http://18.226.82.202:3000/income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log('API Response: ', result);

            if (result?.status === 'success') {
                updateUserData(user?.uid ?? "");
                router.back();
            } else {
                Alert.alert("Income", "Failed to save income.");
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("Income", "Something went wrong.");
            console.error("Submit Error:", error);
        }
    };

    return (
        <ModalWrapper>

            <ScreenWrapper style={styles.container}>
                <Header title="New Income" rightIcon={<PreviousButton />} style={{ marginBottom: spacingY._7, }} />

                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Income Name</Typo>
                        <Input
                            placeholder='Source of Income'
                            value={income.source}
                            onChangeText={(value) => setIncome({ ...income, source: value })} />
                    </View>

                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Income Amount</Typo>
                        <Input
                            placeholder='Salary Amount'
                            value={incomeAmountText}
                            keyboardType="decimal-pad"
                            onChangeText={(value) => {
                                const regex = /^\d*\.?\d{0,2}$/;
                                if (regex.test(value)) {
                                    setIncomeAmountText(value);
                                } else {
                                    Alert.alert("Invalid Amount", "Please enter a valid amount (up to 2 decimal places).");
                                }
                            }}
                        />
                    </View>
                </ScrollView>

            </ScreenWrapper>

            <View style={styles.footer}>
                <Button onPress={onSubmit} style={{ flex: 2 }}>
                    <Typo color={colors.white} fontWeight={"600"}>
                        Add Income
                    </Typo>
                </Button>
            </View>

        </ModalWrapper>
    );
};

export default IncomeModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral900,
        flex: 1,
        paddingHorizontal: spacingX._20,
        gap: spacingY._25,
    },
    form: {
        gap: spacingY._25
    },
    textContainer: {
        gap: spacingY._12,
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: spacingX._15,
        gap: scale(10),
        paddingTop: spacingY._25,
        borderTopColor: colors.neutral800,
        marginBottom: spacingY._40,
        borderTopWidth: 1,
    }
})

function useAuth() {
    const [user, setUser] = useState<{ uid: string } | null>(null);

    const updateUserData = (user_id: string) => {
        console.log(`User data updated for user_id: ${user_id}`);
        setUser({ uid: user_id });
    };

    return { user, updateUserData };
}
