import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import React, { createContext, useContext, ReactNode } from 'react';
import { colors, lightTheme, darkTheme } from '@/constants/themes';
import { scale } from '@/utils/styling';

const ThemeContext = createContext(lightTheme);

interface ThemePickerProps {
    children: ReactNode;
}

export const ThemePicker = ({ children }: ThemePickerProps) => {
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

const styles = StyleSheet.create({})
