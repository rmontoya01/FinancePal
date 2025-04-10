import { Href } from "expo-router";
import { Icon } from "phosphor-react-native";
import React, { ReactNode } from "react";
import { ActivityIndicator, ActivityIndicatorProps, ImageStyle, PressableProps, TextInput, TextInputProps, TextProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

export type ScreenWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
};

export type TypoProps = {
    size?: number;
    color?: string;
    fontWeight?: TextStyle["fontWeight"];
    children: any | null;
    style?: TextStyle;
    textProps?: TextProps;
}

export interface CustomButtonProps extends TouchableOpacityProps {
    style?: ViewStyle;
    onPress?: () => void;
    loading?: boolean;
    children: React.ReactNode;
}

export type PreviousButtonProps = {
    style?: ViewStyle;
    iconSize?: number;
}

export interface InputProps extends TextInputProps {
    icon?: React.ReactNode;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    inputRef?: React.RefObject<TextInput>;
}

export type ModalWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    background?: string;
}

export type ResponseType = {
    success: boolean;
    data?: any;
    message?: string;
}

export type IncomeType = {
    income_id?: number;
    user_id?: number;
    source: string;
    amount?: number;
    month?: number;
    year?: number;
    created_at?: Date;
    updated_at?: Date;
};

export type ExpenseType = {
    expense_id?: number;
    user_id?: number;
    amount?: number;
    category?: string;
    description?: string;
    date?: Date;
    created_at?: Date;
};

export type HeaderProps = {
    title?: string;
    style?: ViewStyle;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

