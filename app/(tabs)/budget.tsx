import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router';

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors, radius } from '@/constants/themes';
import Input from '@/components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";
import BudgetCard from '@/components/BudgetCard';

const budget = () => {

    const router = useRouter();

    const getTotalBalance = () => {
        return 120;
    }

    return (
        <ScreenWrapper style={{ backgroundColor: colors.neutral900 }}>

            <View style={styles.container}>
                {/* Get Total Balance Budget Amount */}
                <View style={styles.totalBalance}>
                    <View style={{ alignItems: 'center' }}>
                        <Typo size={40} fontWeight={"600"}>
                            ${getTotalBalance()}?.toFixed(2)
                        </Typo>
                        <Typo size={18} fontWeight={"400"} color={colors.neutral200}>
                            Balance Budget
                        </Typo>
                    </View>
                </View>

                {/* Creating the touchable buttons */}
                {/* Income */}
                <View style={styles.buttonContainer}>
                    <Button onPress={() => router.push('/(modals)/incomeModal')}>
                        <Typo size={18} fontWeight={"500"} color={colors.white}>Income</Typo>
                        <Ionicons name="cash-sharp" size={24} color="white" />
                    </Button>
                </View>

                {/* Spendings */}
                <View style={styles.buttonContainer}>
                    <Button>
                        <Typo size={18} fontWeight={"500"} color={colors.white}>Spendings</Typo>
                    </Button>
                </View>

                {/* Add to Budget */}
                <View style={styles.buttonContainer}>
                    <Button>
                        <Ionicons name="add-circle-sharp" size={24} color="white" />
                        <Typo size={18} fontWeight={"500"} color={colors.white}>Add to Budget</Typo>
                    </Button>
                </View>

                {/* Finish Budget */}
                <View style={styles.buttonContainer}>
                    <Button>
                        <Typo size={18} fontWeight={"500"} color={colors.white}>Finish Budget</Typo>
                    </Button>
                </View>

            </View>

        </ScreenWrapper>
    )
}

export default budget

const styles = StyleSheet.create({
    container: {
        // flex: 2,
        // justifyContent: 'space-between',
        flex: 1,
        gap: spacingY._25,
        paddingHorizontal: spacingX._20,
    },
    text: {
        color: '#fff',
    },
    containerText: {
        justifyContent: 'center',

        alignItems: 'center',
        backgroundColor: 'lightblue',
        padding: 50,
        height: 10,
        width: 50,

        borderRadius: 20,
    },
    totalBalance: {
        backgroundColor: colors.neutral900,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._40,
        marginTop: spacingY._30,
        // gap: 2,
    },
})