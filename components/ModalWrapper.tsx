import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/themes'
import { ModalWrapperProps } from '@/types'

const ModalWrapper = ({
    style,
    children,
    background = colors.neutral900
}: ModalWrapperProps) => {
    return (
        <View>
            <Text>ModalWrapper</Text>
        </View>
    )
}

export default ModalWrapper

const styles = StyleSheet.create({})