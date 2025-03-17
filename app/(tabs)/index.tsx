import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import BudgetCard from '@/components/BudgetCard';


const HomeScreen = () => {

  const router = useRouter();

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <Header />
      <Text >Welcome to FinancePal</Text>
      <View>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/images/Designer01.jpeg')}
        />
      </View>
      <StatusBar />
    </View>
  );
=======
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

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <View>
            <BudgetCard>

            </BudgetCard>
          </View>
        </ScrollView>

      </View>
    </ScreenWrapper>
  )
>>>>>>> fad5ec2d6c99563b390c59310814ccd25c7a1c34
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._25,
    marginTop: verticalScale(20),
  },
  header: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
<<<<<<< HEAD
    padding: 100,
    margin: 100,
    justifyContent: 'center',
  }
});
=======
    marginBottom: spacingY._50,
  },
  settingsIcon: {
    flexDirection: 'row-reverse',
    alignContent: 'flex-end',
    backgroundColor: colors.neutral800,
    padding: spacingX._7,
    borderRadius: 40,
  },
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(90),
    gap: spacingY._20,
    // flex: 1,
  },
>>>>>>> fad5ec2d6c99563b390c59310814ccd25c7a1c34

})
