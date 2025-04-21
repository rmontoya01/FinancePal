import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import { TabBarCustomize } from '@/components/TabBarCustomize'

const _layout = () => {
  return (
    <Tabs tabBar={TabBarCustomize} screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="budget" options={{ title: "Budget" }} />
    <Tabs.Screen name="history" options={{ title: "History" }} />
    <Tabs.Screen name="index" options={{ title: "Home" }} />
    <Tabs.Screen name="stats" options={{ title: "Stats" }} />
    <Tabs.Screen name="converter" options={{ title: "Converter" }} />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})
