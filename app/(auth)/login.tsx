import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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


const Login = () => {

    const router = useRouter();

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            alert("Please fill in all fields");
            return;
        }

        console.log("Email: ", emailRef.current);
        console.log("Password: ", passwordRef.current);
        console.log("Submitting... Info is valid!");

        // setIsLoading(true);

        // // Simulate a network request
        // setTimeout(() => {
        //     setIsLoading(false);
        //     router.push('/(auth)/mainMenu01');
        // }, 1500);
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <PreviousButton iconSize={30} />

                <View style={{ gap: 10, marginTop: spacingY._20, alignItems: 'center' }}>
                    <Typo size={34} fontWeight={"700"}>
                        FinancePal
                    </Typo>
                    <Typo size={30} fontWeight={"700"}>
                        Sign In
                    </Typo>
                </View>

                <View style={styles.formSubtitle}>
                    <Typo size={14} color={colors.textLighters}>
                        Login here to continue:
                    </Typo>
                    <Input
                        placeholder='Enter your email here'
                        onChangeText={(value) => (emailRef.current = value)}
                        icon={<Ionicons name="at-outline" size={verticalScale(28)} color={colors.neutral400} weight="fill" />}
                    />
                    <Input
                        placeholder='Enter your password here'
                        secureTextEntry
                        onChangeText={(value) => (passwordRef.current = value)}
                        icon={<Ionicons name="lock-closed-sharp" size={verticalScale(28)} color={colors.neutral400} weight="fill" />}
                    />
                </View>
                {/* email and password box */}

                {/* Forgot Password touchable text here */}

                <TouchableOpacity>
                    <Typo size={16} color={colors.text} style={{ alignSelf: "flex-end" }}>
                        Forgot Password?
                    </Typo>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => router.push('/(auth)/forgotPassword')} style={styles.forgotPassword}> */}

                {/* sign in button code below here + animated view */}
                <Animated.View
                    entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
                    style={styles.buttonContainer}>
                    <Button loading={isLoading} onPress={handleSubmit}>
                        <Typo size={18} fontWeight={"500"} color={colors.white}>Sign In </Typo>
                    </Button>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
                    style={styles.buttonContainer}>
                    <Button onPress={() => router.replace('/(auth)/accountsCreate01')}>
                        <Typo size={18} fontWeight={"500"} color={colors.white}>Create an Account?</Typo>
                    </Button>
                </Animated.View>

            </View>
        </ScreenWrapper>
    );
};

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20,
    },
    formSubtitle: {
        gap: spacingY._20,
    }, // button style here
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._40,
        // gap: 2,
    },
    forgotPassword: {
        textAlign: "right",
        fontWeight: "600",
        color: colors.text,
    },
    // footer: {
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     gap: 5,
    // },
    // textFooter: {
    //     textAlign: "center",
    //     color: colors.text,
    //     fontSize: verticalScale(17),
    // },
});
