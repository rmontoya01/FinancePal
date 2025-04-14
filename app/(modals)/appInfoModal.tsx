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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { scale } from '@/utils/styling'

const appInfoModal = () => {
    return (

        <ModalWrapper>
            <Header title="App Info Screen" />

            <View>
                <Text>App Info Modal Screen</Text>
            </View>

        </ModalWrapper>

    )
}

export default appInfoModal

const styles = StyleSheet.create({})