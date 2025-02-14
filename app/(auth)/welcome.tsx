import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router';

import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo"
import { spacingX, spacingY, colors } from '@/constants/themes';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";


const Welcome = () => {

    const router = useRouter();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.loginButton}>
                        <Typo fontWeight={"600"}>Sign In</Typo>
                    </TouchableOpacity>

                    <Animated.Image
                        entering={FadeIn.duration(600)}
                        source={require("../../assets/images/money02.jpeg")}
                        style={styles.welcomePic}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.welcomeFooter}>
                    <Animated.View
                        entering={FadeInDown.duration(1100).delay(110).springify().damping(12)}
                        style={{ alignItems: "center" }}>
                        <Typo size={28} fontWeight={"600"}>Welcome to FinancePal!</Typo>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
                        style={styles.buttonContainer}>
                        <Button onPress={() => router.push('/(auth)/login')}>
                            <Typo size={18} fontWeight={"500"}>Sign In</Typo>
                        </Button>
                    </Animated.View>
                </View>


            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: spacingY._7,
    },
    loginButton: {
        alignSelf: "flex-end",
        marginRight: spacingX._20,
    },
    welcomePic: {
        width: "100%",
        height: verticalScale(375),
        alignSelf: "center",
        // marginTop: verticalScale(100),
        padding: "10%",
        borderRadius: 25,
    },
    welcomeFooter: {
        backgroundColor: colors.neutral900,
        alignItems: "center",
        paddingTop: verticalScale(40),
        paddingBottom: verticalScale(70),
        gap: spacingY._20,
        shadowColor: "white",
        shadowOffset: { width: 5, height: -5 },
        elevation: 15,
        shadowRadius: 25,
        shadowOpacity: 0.20,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._40,
        // gap: 2,
    },
});

