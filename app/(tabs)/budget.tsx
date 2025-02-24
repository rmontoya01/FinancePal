import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'

const budget = () => {
    return (
        <ScreenWrapper>
            <Text style={styles.text}>Create a budget</Text>

            <TouchableOpacity style={styles.container}>
                <Text>Income bro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <Text>Spendings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container}>
                <Text>add to Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container}>
                <Text>Finish Budget</Text>
            </TouchableOpacity>

        </ScreenWrapper>
    )
}

export default budget

const styles = StyleSheet.create({
    container: {
        margin: 30,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
    containerText: {
        justifyContent: 'center',

        alignItems: 'center',
        backgroundColor: 'lightblue',
        padding: 50,
        height: 10,
        width: 50,

        borderRadius: 20,
    },
})