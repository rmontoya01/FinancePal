import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors } from '@/constants/themes';
import Input from '@/components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
    const router = useRouter();
    const usernameRef = useRef("");
    const passwordRef = useRef("");

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        if (!usernameRef.current || !passwordRef.current) {
            alert("Please fill in all fields");
            return;
        }

        console.log("User: ", usernameRef.current);
        console.log("Password: ", passwordRef.current);
        console.log("Submitting... Info is valid!");

        const isLoginValid = await verifyLogin(usernameRef.current, passwordRef.current);

        if (isLoginValid) {
            router.push({ pathname: '/(tabs)', params: { username: usernameRef.current } });
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    const verifyLogin = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('http://18.226.82.202:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log('Login successful:', data.message);

                if (data.token) {
                    await AsyncStorage.setItem('user_token', data.token);
                    console.log('Received token:', data.token);
                }

                if (data.user_id) {
                    await AsyncStorage.setItem('user_id', data.user_id.toString());
                    console.log('Received user_id:', data.user_id);
                }

                if (usernameRef.current) {
                    await AsyncStorage.setItem('username', usernameRef.current);
                    console.log('Received username:', usernameRef.current);
                }

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
        <LinearGradient
            colors={['#1e3c72', '#2a5298']}
            style={styles.gradientContainer}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 1, y: 1 }}
        >
            <ScreenWrapper>
                <View style={styles.container}>
                    <PreviousButton iconSize={30} />

                    <Animated.View
                        entering={ZoomIn.delay(200).duration(800)}
                        style={{ alignItems: 'center', gap: 5, marginTop: spacingY._20 }}
                    >
                        <Typo size={34} fontWeight="700">FinancePal</Typo>
                        <Typo size={30} fontWeight="700">Sign In</Typo>
                    </Animated.View>

                    <View style={styles.formSubtitle}>
                        <Typo size={14} color={colors.textLighters}>
                            Login here to continue:
                        </Typo>

                        <Input
                            placeholder="Enter your username here"
                            onChangeText={(value) => (usernameRef.current = value)}
                            icon={<Ionicons name="people-sharp" size={verticalScale(28)} color={colors.neutral400} />}
                        />

                        <Input
                            key={showPassword ? 'visible' : 'hidden'} // this forces re-render
                            placeholder="Enter your password here"
                            secureTextEntry={!showPassword}
                            onChangeText={(value) => (passwordRef.current = value)}
                            icon={
                                <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                                    <Ionicons
                                        name={showPassword ? 'eye-off-sharp' : 'eye-sharp'}
                                        size={verticalScale(28)}
                                        color={colors.neutral400}
                                    />
                                </TouchableOpacity>
                            }
                        />
                    </View>

                    <TouchableOpacity>
                        <Typo size={16} color={colors.text} style={{ alignSelf: 'flex-end' }}>
                            Forgot Password?
                        </Typo>
                    </TouchableOpacity>

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
        </LinearGradient>
    );
};

export default Login;

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20,
    },
    formSubtitle: {
        gap: spacingY._20,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._40,
    },
    forgotPassword: {
        textAlign: "right",
        fontWeight: "600",
        color: colors.text,
    },
});
