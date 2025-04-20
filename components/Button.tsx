import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { CustomButtonProps } from "@/types";
import { colors, radius } from "@/constants/themes";
import { verticalScale } from "@/utils/styling";
import Loading from "./Loading";
import { useTheme } from '@/context/ThemeContext';

const Button = ({
    style,
    onPress,
    loading = false,
    children
}: CustomButtonProps) => {

    // Beginning of color themes. 
    const { theme } = useTheme();

    if (loading) {
        return (
            <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
                <Loading />
            </View>
        )
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style, { backgroundColor: theme.primary }]}>
            {children}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 17,
        borderCurve: "continuous",
        height: verticalScale(50),
        justifyContent: "center",
        alignItems: "center",
    },
});