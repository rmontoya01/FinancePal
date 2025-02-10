import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'


export default class Chart extends Component {
    render() {
        const chart_wh = 250
        const series = [
            { value: 430, color: '#fbd203', label: { text: 'Salary', color: '#fff', fontSize: 12 } },
            { value: 321, color: '#ffb300', label: { text: 'Rent', color: '#fff', fontSize: 12 } },
            { value: 185, color: '#ff9100', label: { text: 'Freelance', color: '#fff', fontSize: 12 } },
            { value: 123, color: '#ff6c00', label: { text: 'eBay', color: '#fff', fontSize: 12 } },
        ]

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>My Income For The Month</Text>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        margin: 10,
        color: '#fff',
        fontSize: 20,
    },
})

