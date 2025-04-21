import { Alert, StatusBar, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
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

const appInfoModal = () => {
    return (

        <ModalWrapper>
            <View style={styles.container}>
                <Header title="App Info" rightIcon={<PreviousButton />} style={{ marginBottom: spacingY._7 }} />
                <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />

                {/* About Header Container*/}
                <View style={styles.headerContainer}>
                    <Image source={require('../../assets/images/Designer01.jpeg')} style={styles.appLogo} />
                    <Typo size={20} fontWeight={"700"} color={colors.neutral100}> FinancePal </Typo>
                    <Typo size={18} fontWeight={"400"} color={colors.neutral200}>
                        Finance • Budget • Savings
                    </Typo>
                </View>

                {/* Scrollable Info Content */}
                <ScrollView contentContainerStyle={styles.aboutContainer} showsVerticalScrollIndicator={false}>
                    {/* FinancePal Purpose */}
                    <View style={styles.aboutSection}>
                        <View style={styles.aboutRow}>
                            <Ionicons name="information-circle-outline" size={24} color={colors.neutral400} />
                            <Typo style={styles.sectionTitle}>FinancePal Purpose</Typo>
                        </View>
                        <Typo color={colors.neutral300}>
                            FinancePal is a mobile app for both iOS and Android that helps users track their expenses, set budgets, and manage personal finances. The app provides a user-friendly interface for users to input their income and expenses, categorize them, and visualize their finances through pie charts.
                        </Typo>
                    </View>

                    {/* Developer Info */}
                    <View style={styles.aboutSection}>
                        <View style={styles.aboutRow}>
                            <Ionicons name="people-outline" size={24} color={colors.neutral400} />
                            <Typo style={styles.sectionTitle}>Created/Developed By: </Typo>
                        </View>
                        <Typo color={colors.neutral300}>• Eduardo M.</Typo>
                        <Typo color={colors.neutral300}>• Martiniano R.</Typo>
                        <Typo color={colors.neutral300}>• Ayden M.</Typo>
                        <Typo color={colors.neutral300}>• Ramon M.</Typo>
                    </View>

                    {/* Tech Stack Info */}
                    <View style={styles.aboutSection}>
                        <View style={styles.aboutRow}>
                            <Ionicons name="code-working-outline" size={24} color={colors.neutral400} />
                            <Typo style={styles.sectionTitle}>Technology Stack</Typo>
                        </View>
                        <Typo color={colors.neutral300}>• React Native</Typo>
                        <Typo color={colors.neutral300}>• Expo Go</Typo>
                        <Typo color={colors.neutral300}>• AWS EC2</Typo>
                        <Typo color={colors.neutral300}>• SQL Workbench</Typo>
                        <Typo color={colors.neutral300}>• TypeScript</Typo>
                    </View>
                </ScrollView>

            </View>
        </ModalWrapper>

    )
}

export default appInfoModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral900,
        flex: 1,
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._25,
        // paddingBottom: spacingY._25,
        // gap: spacingY._25,
    },
    headerContainer: {
        alignItems: 'center',
        // gap: spacingX._10,
        marginBottom: spacingY._25,
    },
    aboutContainer: {
        gap: spacingY._5,
        paddingBottom: spacingY._20,
    },
    aboutSection: {
        backgroundColor: colors.neutral800,
        borderRadius: 12,
        padding: spacingY._15,
        marginBottom: spacingY._15,
    },
    aboutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacingX._10,
        marginBottom: spacingY._10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.neutral100,
        marginBottom: spacingY._5,
    },
    appLogo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: spacingY._10,
        borderWidth: 2,
        borderColor: colors.neutral400,
        resizeMode: 'cover',
    },
})
