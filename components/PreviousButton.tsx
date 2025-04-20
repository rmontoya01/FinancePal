import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { PreviousButtonProps } from '@/types'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import { colors, radius } from '@/constants/themes';
import { useTheme } from '@/context/ThemeContext';

const PreviousButton = ({
  style,
  iconSize = 24
}: PreviousButtonProps) => {

  const router = useRouter();

  // Beginning of color themes. 
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, style, { backgroundColor: theme.neutral400 }]}>
      <Ionicons name="caret-back-outline" size={verticalScale(iconSize)} color={theme.white} weight="bold" />
    </TouchableOpacity>
  )
}

export default PreviousButton

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    borderRadius: 30,
    borderCurve: "continuous",
    padding: 10,
  },
});