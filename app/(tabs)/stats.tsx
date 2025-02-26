import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors, radius } from '@/constants/themes';
import Input from '@/components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";
import Header from "@/components/Header";
// import SegmentControl from "@react-native-segmented-control/segment-control";


const stats = () => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={{ gap: 5, marginTop: spacingY._5, alignItems: 'center' }}>
                    <Header title="Stats" />
                </View>

                <ScrollView contentContainerStyle={{
                    gap: spacingY._12,
                    paddingTop: spacingY._7,
                    paddingBottom: spacingY._12,
                }}
                    showsVerticalScrollIndicator={false}>
                </ScrollView>

            </View>
        </ScreenWrapper>
    )
}

export default stats

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacingX._15,
        paddingVertical: spacingY._7,
        gap: spacingY._12,
    }
})