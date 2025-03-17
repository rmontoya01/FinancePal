import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, spacingY } from '@/constants/themes'
import { ModalWrapperProps } from '@/types'
import Typo from './Typo'
import Ionicons from '@expo/vector-icons/Ionicons'


const isIos = Platform.OS === 'ios';

const ModalWrapper = ({
    style,
    children,
    background = colors.neutral900
}: ModalWrapperProps) => {

    return (
        <View style={[styles.container, { backgroundColor: background }, style && style]}>
            {children}
        </View>
    );
};

export default ModalWrapper

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral900,
        flex: 1,
        paddingTop: isIos ? spacingY._17 : 40,
        paddingBottom: isIos ? spacingY._17 : spacingY._12
    },
})
