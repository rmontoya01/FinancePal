import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router';

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors, radius } from '@/constants/themes';
import Input from '@/components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";

const HomeScreen = () => {

  const router = useRouter();

  return (
    <ScreenWrapper>

      <View style={styles.container}>

        <View style={styles.header}>

          <View style={{ gap: 5, marginTop: spacingY._5, alignItems: 'center' }}>
            <Typo size={30} color={colors.primaryLight} fontWeight={"500"}>Welcome</Typo>
            <Typo size={32} fontWeight={"600"}>User</Typo>
          </View>

          <TouchableOpacity style={styles.settingsIcon} onPress={() => router.push('/(auth)/settings')}>
            <Ionicons name="settings-sharp" size={24} color={colors.neutral200} weight={"bold"} />
          </TouchableOpacity>

        </View>

        <View style={styles.displayMenu}>
          <Typo size={24} fontWeight={"700"} color={colors.textLight}>Current Budget</Typo>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._25,
    marginTop: verticalScale(6),
  },
  header: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._7,
  },
  settingsIcon: {
    flexDirection: 'row-reverse',
    alignContent: 'flex-end',
    backgroundColor: colors.neutral800,
    padding: spacingX._7,
    borderRadius: 40,
  },
  displayMenu: {
    marginTop: spacingY._20,
    marginBottom: spacingY._10,
    alignItems: 'center',
    backgroundColor: colors.neutral800,
    height: verticalScale(400),
    padding: spacingX._10,
    borderRadius: radius._30,
  }
})
