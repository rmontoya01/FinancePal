import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors, radius } from '@/constants/themes';
import Input from '@/components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";

const mainMenu01 = () => {
  return (
    <View style={styles.container}>
      <Typo>MAIN MENU 01</Typo>
    </View>
  )
}

export default mainMenu01

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: colors.neutral900,
  },
})
