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


const accountsCreate01 = () => {

    const router = useRouter();

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const fullNameRef = useRef("");
    const confirmEmailRef = useRef("");
    const confirmPasswordRef = useRef("");
    const referralCodeRef = useRef("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || !fullNameRef.current || !confirmEmailRef.current || !confirmPasswordRef.current) {
            alert("Please fill in all fields");
            return;
        }

        // Outputting the users input to the console. 
        console.log("Email: ", emailRef.current);
        console.log("Password: ", passwordRef.current);
        console.log("Full Name: ", fullNameRef.current);
        console.log("Confirmed Email: ", confirmEmailRef.current);
        console.log("Confirmed Password: ", confirmPasswordRef.current);
        console.log("Submitting... Info is valid!");

    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <PreviousButton iconSize={30} />

                <View style={{ gap: 5, marginTop: spacingY._5, alignItems: 'center' }}>
                    <Typo size={34} fontWeight={"700"}>
                        New User?
                    </Typo>
                    <Typo size={30} fontWeight={"700"}>
                        Create Your Account!
                    </Typo>
                </View>

                {/* Creating the text fields */}
                <View style={styles.formSubtitle}>
                    <Typo size={14} color={colors.textLighters}>
                        Start your budgeting journey with our help!
                    </Typo>
                    {/* Full Name */}
                    <Input
                        placeholder="Enter your full name here"
                        onChangeText={(text) => fullNameRef.current = text}
                        icon={<Ionicons name="person-circle-sharp"
                            size={verticalScale(28)} color={colors.neutral400} weight="fill" />}
                    />
                    {/* Email */}
                    <Input
                        placeholder='Enter email of choice here'
                        onChangeText={(value) => (emailRef.current = value)}
                        icon={<Ionicons name="at-outline" size={verticalScale(28)} color={colors.neutral400} weight="fill" />}
                    />
                    {/* Confirm Email */}
                    <Input
                        placeholder='Confirm your email here'
                        onChangeText={(value) => (confirmEmailRef.current = value)}
                        icon={<Ionicons name="at-outline" size={verticalScale(28)} color={colors.neutral400} weight="fill" />}
                    />
                    {/* Password */}
                    <Input
                        placeholder='Enter a password of choice here'
                        secureTextEntry
                        onChangeText={(value) => (passwordRef.current = value)}
                        icon={<Ionicons name="lock-closed-sharp" size={verticalScale(28)} color={colors.neutral400} weight="fill" />}
                    />
                    {/* Confirm Password */}
                    <Input
                        placeholder='Confirm your password here'
                        secureTextEntry
                        onChangeText={(value) => (confirmPasswordRef.current = value)}
                        icon={<Ionicons name="lock-closed-sharp" size={verticalScale(28)} color={colors.neutral400} weight="fill" />}
                    />
                </View>

                {/* Creating the account button */}
                <Animated.View
                    entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
                    style={styles.buttonContainer}>
                    <Button loading={isLoading} onPress={handleSubmit}>
                        <Typo size={18} fontWeight={"500"} color={colors.white}>Create New Account</Typo>
                    </Button>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
                    style={styles.buttonContainer}>
                    <Button onPress={() => router.replace('/(auth)/login')}>
                        <Typo size={18} fontWeight={"500"} color={colors.white}>Existing Account</Typo>
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
