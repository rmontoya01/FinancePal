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
                <Header title="App Info Screen" rightIcon={<PreviousButton />} style={{ marginBottom: spacingY._7 }} />
                <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />
                <Typo size={18} fontWeight={"400"} color={colors.neutral200} >
                    Finance • Budget • Savings
                </Typo>

                <View>
                    <Typo>App Info Modal Screen</Typo>
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
})