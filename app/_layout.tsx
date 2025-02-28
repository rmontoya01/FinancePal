import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";
import { Presentation } from 'phosphor-react-native';

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="(modals)/incomeModal" options={{ presentation: "modal", }} />

    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})