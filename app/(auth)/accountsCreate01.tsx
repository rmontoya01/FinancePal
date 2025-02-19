import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors, radius } from '@/constants/themes';
import Input from '@/components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";
import { useRouter } from 'expo-router';

const accountsCreate01 = () => {

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    // const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || !nameRef.current) {
            alert("Please fill in all of fields");
            return;
        }
        console.log("email: ", emailRef.current);
        console.log("password: ", passwordRef.current);
        console.log("name: ", nameRef.current);
        console.log("submitting... it is valid");
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <PreviousButton iconSize={30} />

                <View style={{ gap: 10, marginTop: spacingY._20, alignItems: 'center' }}>
                    <Typo>Create your account here</Typo>
                </View>

                {/* create fields */}
                <View style={{ paddingHorizontal: spacingX._20, gap: spacingY._20, marginTop: spacingY._20 }}>
                    <Typo>
                        Create your account here!
                    </Typo>
                    <Input
                        placeholder="Email"
                        onChangeText={(text) => emailRef.current = text}
                    />
                </View>

                {/* Password */}
                <View style={{ paddingHorizontal: spacingX._20, gap: spacingY._20, marginTop: spacingY._20 }}>
                    <Input
                        placeholder="Password"
                        onChangeText={(text) => emailRef.current = text}
                        secureTextEntry={true}
                    />
                </View>

                <View style={{ paddingHorizontal: spacingX._20, gap: spacingY._20, marginTop: spacingY._20 }}>
                    <Input
                        placeholder="Confirm Password"
                        onChangeText={(text) => emailRef.current = text}
                        secureTextEntry={true}
                    />
                </View>

                <View style={{ paddingHorizontal: spacingX._20, gap: spacingY._20, marginTop: spacingY._20 }}>
                    <Input
                        placeholder="Full Name"
                        onChangeText={(text) => emailRef.current = text}
                    />
                </View>

                <View style={{ paddingHorizontal: spacingX._20, gap: spacingY._20, marginTop: spacingY._20 }}>
                    <Input
                        placeholder="Fill In Blank"
                        onChangeText={(text) => emailRef.current = text}
                    />
                </View>

            </View>
        </ScreenWrapper>
    )
}

export default accountsCreate01

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        backgroundColor: colors.neutral900,
    },
})
