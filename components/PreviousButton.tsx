import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { PreviousButtonProps } from '@/types'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import { colors, radius } from '@/constants/themes';

const PreviousButton = ({
    style,
    iconSize = 26
}: PreviousButtonProps) => {

    const router = useRouter();

  return (
    <TouchableOpacity onPress={()=> router.back()} style={[styles.button, style]}>
      <Ionicons name="caret-back-outline" size={verticalScale(iconSize)} color={colors.white} weight="bold" />
    </TouchableOpacity>
  )
}

export default PreviousButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.neutral700,
        alignSelf: "flex-start",
        borderRadius: radius._30,
        borderCurve: "continuous",
        padding: 10,
    },
});