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


const IncomeModal = () => {

    // const { user, updateUserData } = useAuth();

    const [income, setIncome] = useState<IncomeType>({
        name: "",
        // image: null,
    });

    // const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async () => {
        let { name } = income;
        if (!name.trim()) {
            Alert.alert("Income", "Please fill in all of the fields!");
            return;
        }

        const data: IncomeType = {
            name,
            // uid: user?.uid
        }

        // setLoading(true);
        // const result: { status: string } = await createOrUpdateIncome(data);
        // setLoading(false);
        // console.log('result: ', result);
        // if (result && result.status === 'success') {
        //     updateUserData(user?.uid as string);
        //     router.back();
        // } else {
        //     Alert.alert("Income", "not correct testresult")
        // }
    };

    return (
        <ModalWrapper>

            <View style={styles.container}>
                <Header title="New Income" rightIcon={<PreviousButton />} style={{ marginBottom: spacingY._7, }} />

                {/* Entry Input Slots */}
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Income Name</Typo>
                        <Input
                            placeholder='Salary Pay'
                            value={income.name}
                            onChangeText={(value) => setIncome({ ...income, name: value })} />
                    </View>
                </ScrollView>

                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Income Amount</Typo>
                        <Input
                            placeholder='Salary Amount'
                            value={income.name}
                            onChangeText={(value) => setIncome({ ...income, name: value })} />
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

export default IncomeModal

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

// function useAuth(): { user: any; updateUserData: any } {
//     throw new Error('Function not implemented.')
// }

