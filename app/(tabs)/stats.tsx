import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router';

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
                    <Header title="Stats" style={{ marginVertical: spacingY._5 }} />
                    {/* <Text style={styles.text}> Stats here</Text> */}
                </View>

                <ScrollView contentContainerStyle={{
                    gap: spacingY._12,
                    paddingTop: spacingY._7,
                    paddingBottom: spacingY._12,
                }}
                    showsVerticalScrollIndicator={false}>
                    <Text style={styles.text}> Pi Chart Here</Text>
                    <View style={styles.containerText}>
                        <Text >Key here</Text>
                    </View>
                    <Text style={styles.text}> Details or top 5 over budget</Text>
                    <View style={styles.containerText}>
                        <Text >Details here</Text>
                    </View>

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
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.neutral200,
    },
    containerText: {
        backgroundColor: 'lightblue',
        padding: 50,

        width: '90%',
        marginBlockStart: "10%",
        borderRadius: 20,
    },
})