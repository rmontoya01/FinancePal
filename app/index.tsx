import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '@/constants/themes'
import { useRouter } from 'expo-router'

// URL for Ionicons is https://icons.expo.fyi/

const index = () => {

    // This constant routes to the welcome screen after a 1.150 second splashscreen icon. 
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push('/(auth)/welcome')
        }, 1150);
    }, [])

    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                resizeMode="contain"
                source={require("../assets/images/money01.jpeg")}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.neutral900,
    },
    icon: {
        height: "35%",
        aspectRatio: 1,
        borderRadius: 50,
    }
});
