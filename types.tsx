import { Href } from "expo-router";
import { Firestore, Timestamp } from "firebase/firestore";
import { Icon } from "phosphor-react-native";
import React, { ReactNode } from "react";

import {
    ActivityIndicator,
    ActivityIndicatorProps,
    ImageStyle,
    PressableProps,
    TextInput,
    TextInputProps,
    TextProps,
    TextStyle,
    TouchableOpacityProps,
    ViewStyle,
} from "react-native";

export type ScreenWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    // bg?: string;
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
    // hasShadow?: boolean;
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
    // label?: string;
    // error?: string;
}

export type ModalWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    background?: string;
    // bg?: string;
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
    created_at?: Timestamp;
    updated_at?: Timestamp;
};

export type SpendingsType = {
    expense_id?: number;
    user_id?: number;
    amount?: number;
    category?: string;
    description?: string;
    date?: Date;
    created_at?: Timestamp;
};

export type HeaderProps = {
    title?: string;
    style?: ViewStyle;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

