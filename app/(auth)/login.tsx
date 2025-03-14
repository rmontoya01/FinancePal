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

    const usernameRef = useRef("");
    const passwordRef = useRef("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!usernameRef.current || !passwordRef.current) {
            alert("Please fill in all fields");
            return;
        }

        console.log("User: ", usernameRef.current);
        console.log("Password: ", passwordRef.current);
        console.log("Submitting... Info is valid!");

        // Mock login verification (replace with actual API call in the future)
        // This is where you should call your API to verify the login credentials
        const isLoginValid = await verifyLogin(usernameRef.current, passwordRef.current);

        if (isLoginValid) {
            router.push('/(tabs)');  // Redirect to next screen if login is successful
        } else {
            alert("Invalid credentials. Please try again.");
        }
    }

    // Replace this mock function with actual API call to verify login credentials
    // Replace this mock function with actual API call to verify login credentials
    const verifyLogin = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('http://18.191.240.219:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log('Login successful:', data.message);
                return true;
            } else {
                console.log('Login failed:', data.error);
                return false;
            }
        } catch (error) {
            console.error('Error during login:', error);
            return false;
        }
    };


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
                        placeholder='Enter your username here'
                        onChangeText={(value) => (usernameRef.current = value)}
                        icon={<Ionicons name="people-sharp" size={verticalScale(28)} color={colors.neutral400} weight="fill" />}
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
