import { StyleSheet, Text, View, Platform, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import { colors } from "@/constants/themes"
import { useTheme } from '@/context/ThemeContext'

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {

  const { theme } = useTheme()

  let paddingTop = Platform.OS == 'ios' ? height * 0.06 : 50;

  return (
    <View
      style={[
        {
          paddingTop,
          flex: 1,
          backgroundColor: theme.background
        },
        style
      ]}>
      <StatusBar barStyle={"light-content"} />
      {children}
    </View>
  );
};

export default ScreenWrapper

const styles = StyleSheet.create({})

