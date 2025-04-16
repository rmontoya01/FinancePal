import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Typo from './Typo';
import { scale, verticalScale } from '@/utils/styling';
import { colors, spacingX, spacingY } from '@/constants/themes';
import Ionicons from '@expo/vector-icons/Ionicons';

const BudgetCard = ({ income = 0, expense = 0, balance = 0 }) => {
    return (
        <ImageBackground
            source={require('../assets/images/bluePatternTransperant.png')}
            resizeMode='stretch'
            borderRadius={20}
            style={styles.cardImage}>

            <View style={styles.container}>
                <View>
                    <View style={styles.totaledAmount}>
                        <Typo color={colors.white} size={20} fontWeight={"600"}>
                            Total Balance
                        </Typo>
                        <Ionicons name="ellipsis-vertical-sharp" size={24} color={colors.white} weight="fill" />
                    </View>
                    <Typo color={colors.white} size={30} fontWeight={"700"}>
                        ${balance.toFixed(2)}
                    </Typo>
                </View>

                {/* Incomes and Expenses Amt */}
                <View style={styles.stats}>
                    {/* Income */}
                    <View style={{ gap: verticalScale(10) }}>
                        <View style={styles.incomesExpenses}>
                            <TouchableOpacity style={styles.statsIcon}>
                                <Ionicons name="arrow-down-sharp" size={24} color={colors.neutral900} />
                            </TouchableOpacity>
                            <Typo size={16} color={colors.white} fontWeight={"600"}>
                                Income
                            </Typo>
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Typo size={20} color={colors.green} fontWeight={"700"}>
                                ${income.toFixed(2)}
                            </Typo>
                        </View>
                    </View>
                    {/* Expenses Amt */}
                    <View style={{ gap: verticalScale(10) }}>
                        <View style={styles.incomesExpenses}>
                            <TouchableOpacity style={styles.statsIcon}>
                                <Ionicons name="arrow-up-sharp" size={24} color={colors.neutral900} />
                            </TouchableOpacity>
                            <Typo size={16} color={colors.white} fontWeight={"600"}>
                                Expense
                            </Typo>
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Typo size={20} color={colors.red} fontWeight={"700"}>
                                ${expense.toFixed(2)}
                            </Typo>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default BudgetCard;

const styles = StyleSheet.create({
    cardImage: {
        height: scale(350),
        width: "100%",
    },
    container: {
        padding: spacingX._25,
        paddingHorizontal: scale(25),
        height: "90%",
        width: "100%",
        justifyContent: "space-between"
    },
    totaledAmount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacingY._5,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    statsIcon: {
        backgroundColor: colors.neutral300,
        padding: spacingY._5,
        borderRadius: 55,
    },
    incomesExpenses: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingY._10,
    },
});
