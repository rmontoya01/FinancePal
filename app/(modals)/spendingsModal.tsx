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
import { IncomeType } from '@/types'
import { useRouter } from 'expo-router'
import { scale } from '@/utils/styling'
import { createOrUpdateIncome } from '@/services/incomeService'

const spendingsModal = () => {

    const [income, setIncome] = useState<IncomeType>({
        name: "",
        // image: null,
    });

    const router = useRouter();

    const onSubmit = async () => {
        let { name } = income;
        if (!name.trim()) {
            Alert.alert("Spendings", "Please fill in all of the fields!");
            return;
        }

        const data: IncomeType = {
            name,
            // uid: user?.uid
        }
    }

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
                            value={income.name}
                            onChangeText={(value) => setIncome({ ...income, name: value })} />
                    </View>
                </ScrollView>

                {/* Spendings Cost */}
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Spendings Cost</Typo>
                        <Input
                            placeholder='Spendings Cost'
                            value={income.name}
                            onChangeText={(value) => setIncome({ ...income, name: value })} />
                    </View>
                </ScrollView>

                {/* Spendings Type */}
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Spendings Type</Typo>
                        <Input
                            placeholder='Spendings Type'
                            value={income.name}
                            onChangeText={(value) => setIncome({ ...income, name: value })} />
                    </View>
                </ScrollView>

                {/* Transaction Date */}
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Transaction Date</Typo>
                        <Input
                            placeholder='Transaction Date'
                            value={income.name}
                            onChangeText={(value) => setIncome({ ...income, name: value })} />
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

export default spendingsModal

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
