import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/themes'
import Ionicons from '@expo/vector-icons/Ionicons'

const IncomeModal = () => {
    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Typo>IncomeModal</Typo>
                {/* <StatusBar style="auto" /> */}
                <Ionicons name="cash-sharp" size={24} color="black" />
            </View>
        </ModalWrapper>
    )
}

export default IncomeModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral900,
        flex: 1,
    },
})

