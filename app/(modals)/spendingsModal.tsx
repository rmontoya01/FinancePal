import { Alert, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/themes'
import Ionicons from '@expo/vector-icons/Ionicons'
import PreviousButton from '@/components/PreviousButton'
import Header from '@/components/Header'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { IncomeType, SpendingsType } from '@/types'
import { useRouter } from 'expo-router'
import { scale } from '@/utils/styling'
import { createOrUpdateIncome } from '@/services/incomeService'
import { Timestamp } from 'firebase/firestore'

const SpendingsModal = () => {

    const [spendings, setSpendings] = useState<SpendingsType>({
        expense_id: 0,
        user_id: 0,
        amount: 0,
        category: "",
        description: "",
        date: new Date(Date.now()),
        created_at: Timestamp.now(),
    });

    const router = useRouter();

    const onSubmit = async () => {
        let { amount, category, description, date } = spendings;
        if (!amount || !category?.trim() || !description?.trim() || !date) {
            Alert.alert("Spendings", "Please fill in all of the fields!");
            return;
        }

        const data: SpendingsType = {
            user_id: 0,
            amount,
            category,
            description,
            date,
            created_at: Timestamp.now(),
        };

        try {
            // Sending data to your backend or database
            const response = await fetch('http://18.226.82.202:3000/spendings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json(); // No need to parse if it's already JSON
            console.log('result: ', result);

            if (result?.status === 'success') {
                router.back(); // Navigate back
            } else {
                Alert.alert("Spendings", "Failed to save spendings.");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            Alert.alert("Spendings", "Something went wrong.");
        }
    };

    return (

        <ModalWrapper>

            <View style={styles.container}>
                <Header title="New Spendings" rightIcon={<PreviousButton />} style={{ marginBottom: spacingY._7, }} />

                {/* Entry Input Slots */}
                {/* Spendings Name */}
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Spendings Name</Typo>
                        <Input
                            placeholder='Spendings Name'
                            value={spendings.category}
                            onChangeText={(value) => setSpendings({ ...spendings, category: value })} />
                    </View>


                    {/* Spendings Cost */}
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Spendings Cost</Typo>
                        <Input
                            placeholder='Spendings Cost'
                            value={String(spendings.amount)}
                            onChangeText={(value) => setSpendings({ ...spendings, amount: parseFloat(value) || 0 })} />
                    </View>

                    {/* Spendings Type */}
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Spendings Type</Typo>
                        <Input
                            placeholder='Spendings Type'
                            value={spendings.description}
                            onChangeText={(value) => setSpendings({ ...spendings, description: value })} />
                    </View>

                    {/* Transaction Date */}
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Transaction Date</Typo>
                        <Input
                            placeholder='Transaction Date'
                            value={spendings.date?.toString()}
                            onChangeText={(value) => setSpendings({ ...spendings, date: new Date(value) })} />
                    </View>
                </ScrollView>

            </View>

            <View style={styles.footer}>
                <Button onPress={onSubmit} style={{ flex: 2 }}>
                    <Typo color={colors.white} fontWeight={"600"}>
                        Add Spendings
                    </Typo>
                </Button>
            </View>

        </ModalWrapper>

    )
}

export default SpendingsModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral900,
        flex: 1,
        // borderRadius: "10%"
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
    },
});
