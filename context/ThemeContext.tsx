import { StyleSheet, Text, View, Appearance, useColorScheme } from 'react-native'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { lightTheme, darkTheme } from '@/constants/themes';

type ThemeType = typeof lightTheme;

interface ThemeContextType {
    theme: ThemeType;
    themeMode: 'light' | 'dark' | 'system';
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    themeMode: 'system',
    setThemeMode: () => { },
});

export const ThemePicker = ({ children }: { children: ReactNode }) => {
    const systemScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');

    const getTheme = (): ThemeType => {
        const scheme = themeMode === 'system' ? systemScheme : themeMode;
        return scheme === 'dark' ? darkTheme : lightTheme;
    };

    const theme = getTheme();

    return (
        <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

const styles = StyleSheet.create({})