import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'

const converter = () => {
    return (
        <ScreenWrapper>
            <Header title="Currency Converter Page" />
            <Text>CONVERTER</Text>
        </ScreenWrapper>
    )
}

export default converter

const styles = StyleSheet.create({})