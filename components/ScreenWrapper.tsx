import { StyleSheet, View, Platform, Dimensions, StatusBar } from 'react-native';
import React from 'react';
import { ScreenWrapperProps } from '@/types';
import { colors } from "@/constants/themes";
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    const paddingTop = Platform.OS === 'ios' ? height * 0.06 : 50;

    return (
        <LinearGradient

        //colors={['#000428', '#004e92']} //Blue Gradient
        //colors={['#41295a', '#2F0743']} //Purple Night
        colors={['#0a0f2c', '#152154', '#1b2c6b']} //Business Night Blue
        //colors={['#1F1C2C', '#928DAB']} //Artic Ice
        //colors={['#000000', '#434343']} //Black Gradient
        //colors={['#000000', '#1f1f1f', '#2b2b2b']} //Phantom Black
        //colors={['#2C3E50', '#4CA1AF']} //Ocean Blue
        //colors={['#232526', '#414345', '#606c88']} //Deep Thread''
        //colors={['#2b5876', '#4e4376']} //Baby blue

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
