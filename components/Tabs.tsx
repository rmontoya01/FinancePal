import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tabs = () => {
    const tabs = ['Home', 'Transactions', 'Budget', 'Reports', 'Settings'];

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>Home</Text>
                router.push('/(auth)/mainMenu01')
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>history</Text>
                router.push('/(tabs)/history')
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>Budget</Text>
                router.push('/(auth)/welcome')
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>Reports</Text>
                router.push('/(auth)/welcome')
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>Settings</Text>
                router.push('/(auth)/welcome')
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    tab: {
        padding: 10,
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
});

export default Tabs;