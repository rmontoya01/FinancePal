import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '@/constants/themes'
import { useRouter } from 'expo-router'
import { useTheme } from '@/context/ThemeContext'
import { scale } from '@/utils/styling'

// URL for Ionicons is https://icons.expo.fyi/

const index = () => {

    // Beginning of color themes. 
    const { theme } = useTheme();

    // This constant routes to the welcome screen after a 1.150 second splashscreen icon. 
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.replace('/(auth)/welcome')
        }, 1150);
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: theme.neutral900 }]}>
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
    },
    icon: {
        height: "35%",
        aspectRatio: 1,
        borderRadius: 50,
    }
});
