import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import { TabBarCustomize } from '@/components/TabBarCustomize'

const _layout = () => {
  return (
    <Tabs tabBar={TabBarCustomize} screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="budget" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="stats" />
      <Tabs.Screen name="converter" />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})
