import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import Tabs from "@/components/Tabs";

const mainMenu01 = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <PreviousButton iconSize={30} />
      <View style={{ gap: 10, marginTop: spacingY._20, alignItems: 'center' }}>
        <Typo>Income and More Info!</Typo>
        <Tabs />
      </View>
    </ScreenWrapper>
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
  card: {
    justifyContent: "flex-start",
    backgroundColor: colors.neutral300,
  }
})
