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


export default function Settings() {

  const router = useRouter();

  return (
    <ScreenWrapper>

      <View style={styles.container}>
        <PreviousButton iconSize={30} />

        <View style={{ gap: 2, marginTop: spacingY._5, alignItems: 'center' }}>
          <Typo size={34} fontWeight={"700"}>
            Settings
          </Typo>
          <Typo size={30} fontWeight={"700"}>
            Page
          </Typo>
        </View>

        {/* Creating the various setting buttons */}
        {/* ANIMATED VIEW */}
        <Animated.View
          entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
          style={styles.buttonContainer}>
          <Button>
            <Typo size={18} fontWeight={"500"} color={colors.white}>Light/Dark Mode</Typo>
          </Button>
        </Animated.View>

        {/* Other Settings */}
        <View style={styles.buttonContainer}>
          <Button>
            <Typo size={18} fontWeight={"500"} color={colors.white}>Other Settings</Typo>
          </Button>
        </View>

        {/* App Info */}
        <View style={styles.buttonContainer}>
          <Button>
            <Typo size={18} fontWeight={"500"} color={colors.white}>App Info</Typo>
          </Button>
        </View>

        {/* Delete User */}
        <View style={styles.buttonContainer}>
          <Button>
            <Typo size={18} fontWeight={"500"} color={colors.white}>Delete User</Typo>
          </Button>
        </View>

        {/* Change User */}
        <View style={styles.buttonContainer}>
          <Button>
            <Typo size={18} fontWeight={"500"} color={colors.white}>Change User</Typo>
          </Button>
        </View>

      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Button onPress={() => router.replace('/(tabs)')}>
          <Typo size={18} fontWeight={"500"} color={colors.white}>Return & Confirm</Typo>
        </Button>
      </View>

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._25,
    paddingHorizontal: spacingX._20,
  },
  formSubtitle: {
    gap: spacingY._17,
  }, // button style here
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._40,
    // gap: 2,
  },
  footerContainer: {
    width: "100%",
    paddingHorizontal: spacingX._40,
    paddingBottom: spacingY._40,
    gap: 2,
  },
}
);
