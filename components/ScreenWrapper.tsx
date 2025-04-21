import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, Dimensions, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { ScreenWrapperProps } from '@/types';

const { height } = Dimensions.get('window');

export const gradientPresets: Record<string, [string, string, ...string[]]> = {
  'Business Night': ['#0a0f2c', '#152154', '#1b2c6b'],
  'Purple Night': ['#41295a', '#2F0743'],
  'Black Gradient': ['#000000', '#434343'],
  'Ocean Blue': ['#2C3E50', '#4CA1AF'],
  'Phantom Black': ['#000000', '#1f1f1f', '#2b2b2b'],
};

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const paddingTop = Platform.OS === 'ios' ? height * 0.06 : 50;

  const [gradientColors, setGradientColors] = useState<[string, string, ...string[]]>(
    gradientPresets['Business Night']
  );

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem('selectedTheme');
      if (stored && gradientPresets[stored]) {
        setGradientColors(gradientPresets[stored]);
      }
    };

    loadTheme();

    const interval = setInterval(loadTheme, 1000); // Refresh if theme changes elsewhere
    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ flex: 1, paddingTop }, style]}
    >
      <StatusBar barStyle="light-content" />
      {children}
    </LinearGradient>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
