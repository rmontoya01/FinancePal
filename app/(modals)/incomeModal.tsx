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
import { useLocalSearchParams, useRouter } from 'expo-router'
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

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async () => {
        let { source, amount = 0 } = income;
        if (!source.trim() || amount <= 0) {
            Alert.alert("Income", "Please fill in all of the fields!");
            return;
        }
    
        // Get current date to add to the income record
        const calendarNow = new Date(Date.now());
    
        // Create the data object to send to the backend
        const data = {
            amount,
            month: calendarNow.getMonth() + 1,
            source,
            user_id: user?.uid,  // Ensure this is being set correctly
            year: calendarNow.getFullYear(),
        };
    
        // Send the data to the backend API
        setLoading(true);
        try {
            const response = await fetch('http://18.226.82.202:3000/income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),  // This includes the logged-in user's user_id
            });
    
            const result = await response.json();
            if (result?.status === 'success') {
                updateUserData(user?.uid ?? "");  // Refresh user data
                router.back();  // Navigate back to the previous screen
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

            <View style={styles.container}>
                <Header title="New Income" rightIcon={<PreviousButton />} style={{ marginBottom: spacingY._7, }} />

                {/* Entry Input Slots */}
                {/* Income Name Aka Source */}
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Income Name</Typo>
                        <Input
                            placeholder='Source of Income'
                            value={income.source}
                            onChangeText={(value) => setIncome({ ...income, source: value })} />
                    </View>


                    {/* Income Amount */}
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Income Amount</Typo>
                        <Input
                            placeholder='Salary Amount'
                            value={(income.amount ?? 0).toString()}
                            keyboardType="numeric"
                            onChangeText={(value) => setIncome({ ...income, amount: parseFloat(value) || 0 })} />
                    </View>
                </ScrollView>

            </View>

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
    }
})

function useAuth() {
    const [user, setUser] = useState<{ uid: string } | null>(null); // Initially null

    const updateUserData = (userId: string) => {
        console.log(`User data updated for userId: ${userId}`);
        setUser({ uid: userId }); // Set the actual logged-in user ID
    };

    return { user, updateUserData };
}

