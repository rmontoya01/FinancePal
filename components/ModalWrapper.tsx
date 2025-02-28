import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/themes'
import { ModalWrapperProps } from '@/types'
import Typo from './Typo'
import Ionicons from '@expo/vector-icons/Ionicons'

const ModalWrapper = ({
    style,
    children,
    background = colors.neutral900
}: ModalWrapperProps) => {
    return (
        <View>
            <Text>ModalWrapper</Text>
            <View style={styles.container}>
                <Typo>IncomeModal</Typo>
                {/* <StatusBar style="auto" /> */}
                <Ionicons name="cash-sharp" size={24} color="black" />
            </View>
        </View>
    )
}

export default ModalWrapper

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral900,
        flex: 1,
    },
})