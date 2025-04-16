import { Alert, StatusBar, StyleSheet, Text, View, ScrollView, Image, useColorScheme } from 'react-native'
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

    const colorScheme = useColorScheme();

    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle =
        colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (

        <ModalWrapper>

            <View style={styles.container}>
                <Header title="Dark Mode Screen" rightIcon={<PreviousButton />} style={{ marginBottom: spacingY._7 }} />
                <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />

                <View>
                    <Typo>Dark Mode Modal Screen</Typo>
                </View>

                <View style={[styles.container, themeContainerStyle]}>
                    <Text style={[styles.text, themeTextStyle]}>Color scheme: {colorScheme}</Text>
                    <StatusBar />
                </View>

                <View>
                    <Typo size={14} fontWeight={'900'} color={colors.neutral600}>About</Typo>
                </View>

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
        gap: spacingY._25,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
})