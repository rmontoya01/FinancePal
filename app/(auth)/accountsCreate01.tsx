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
import { useTheme } from '@/context/ThemeContext';

const registerUser = async (email: string, password: string, name: string, username: string) => {
    try {
        const response = await fetch("http://18.226.82.202:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, name, username }) // Send the user's input to the server
        });

        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, error: "An error occurred while creating your account." };
    }
};


const accountsCreate01 = () => {

    const router = useRouter();

    // Beginning of color themes. 
    const { theme } = useTheme();

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    const usernameRef = useRef("");
    const confirmPasswordRef = useRef("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || !nameRef.current || !usernameRef.current || !confirmPasswordRef.current) {
            alert("Please fill in all fields");
            return;
        }
        if (passwordRef.current !== confirmPasswordRef.current) {
            alert("Passwords do not match!");
            return;
        }

        setIsLoading(true); // start loading state

        // Outputting the users input to the console. 
        console.log("Email: ", emailRef.current);
        console.log("Password: ", passwordRef.current);
        console.log("Full Name: ", nameRef.current);
        console.log("Username: ", usernameRef.current);
        console.log("Confirmed Password: ", confirmPasswordRef.current);
        console.log("Submitting... Info is valid!");

        try {
            const result = await registerUser(
                emailRef.current,
                passwordRef.current,
                nameRef.current,
                usernameRef.current
            );

            if (result.success) {
                alert("Account created successfully!");
                router.replace('/(auth)/login'); // Navigate to login page
            } else {
                alert(result.data.error || "Registration failed");
            }
        } finally {
            setIsLoading(false); // Stop loading state
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <PreviousButton iconSize={30} />

                <View style={{ gap: 5, marginTop: spacingY._5, alignItems: 'center' }}>
                    <Typo size={34} fontWeight={"700"} color={theme.text}>
                        New User?
                    </Typo>
                    <Typo size={30} fontWeight={"700"} color={theme.text}>
                        Create Your Account!
                    </Typo>
                </View>

                {/* Creating the text fields */}
                <View style={styles.formSubtitle}>
                    <Typo size={14} color={theme.textLighters}>
                        Start your budgeting journey with our help!
                    </Typo>
                    {/* Full Name */}
                    <Input
                        placeholder="Enter your full name here"
                        onChangeText={(text) => nameRef.current = text}
                        icon={<Ionicons name="person-circle-sharp"
                            size={verticalScale(28)} color={theme.neutral100} weight="fill" />}
                    />
                    {/* Email */}
                    <Input
                        placeholder='Enter an email of choice here'
                        onChangeText={(value) => (emailRef.current = value)}
                        icon={<Ionicons name="at-outline" size={verticalScale(28)} color={theme.neutral100} weight="fill" />}
                    />
                    {/* Username */}
                    <Input
                        placeholder='Enter a username of choice here'
                        onChangeText={(value) => (usernameRef.current = value)}
                        icon={<Ionicons name="people-sharp" size={verticalScale(28)} color={theme.neutral100} weight="fill" />}
                    />
                    {/* Password */}
                    <Input
                        placeholder='Enter a password of choice here'
                        secureTextEntry
                        onChangeText={(value) => (passwordRef.current = value)}
                        icon={<Ionicons name="lock-open-sharp" size={verticalScale(28)} color={theme.neutral100} weight="fill" />}
                    />
                    {/* Confirm Password */}
                    <Input
                        placeholder='Confirm your password here'
                        secureTextEntry
                        onChangeText={(value) => (confirmPasswordRef.current = value)}
                        icon={<Ionicons name="lock-closed-sharp" size={verticalScale(28)} color={theme.neutral100} weight="fill" />}
                    />
                </View>

                {/* Creating the account button */}
                <Animated.View
                    entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
                    style={styles.buttonContainer}>
                    <Button loading={isLoading} onPress={handleSubmit}>
                        <Typo size={18} fontWeight={"500"} color={theme.text}>Create New Account</Typo>
                    </Button>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
                    style={styles.buttonContainer}>
                    <Button onPress={() => router.replace('/(auth)/login')}>
                        <Typo size={18} fontWeight={"500"} color={theme.text}>Existing Account</Typo>
                    </Button>
                </Animated.View>

            </View>
        </ScreenWrapper>
    );
};

export default accountsCreate01

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._25,
        paddingHorizontal: spacingX._20,
    },
    formSubtitle: {
        gap: spacingY._17,
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
});
