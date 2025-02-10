import { StyleSheet, Text, View, TextStyle } from 'react-native'
import React from 'react'

import { colors } from "@/constants/themes";
import { TypoProps } from "@/types";
import { verticalScale } from "@/utils/styling";

const Typo = ({

    size,
    color = colors.text,
    fontWeight = "500",
    children,
    style,
    textProps = {},
}: TypoProps) => {

    const textStyle: TextStyle = {
        fontSize: size? verticalScale(size): verticalScale(20),
        color,
        fontWeight
    }

    return (
        <Text style={[textStyle, style]} {...textProps}>
            {children}
        </Text>
    );
};

export default Typo

const styles = StyleSheet.create({})

