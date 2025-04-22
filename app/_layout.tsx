import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";
import { Presentation } from 'phosphor-react-native';
import { ThemePicker } from '@/context/ThemeContext';

const _layout = () => {
  return (

    <ThemePicker>
      <Stack screenOptions={{ headerShown: false }}>


        {/* MAKE SURE TO UNCOMMENT TO GET MODALS TO WORK */}
        {/* To confirm modals, edit it inline here */}
        {/* Income Modal */}
        <Stack.Screen name="(modals)/incomeModal" options={{ presentation: "modal", }} />
        {/* Spendings Modal */}
        <Stack.Screen name="(modals)/spendingsModal" options={{ presentation: "modal", }} />
        {/* App Info Modal */}
        <Stack.Screen name="(modals)/appInfoModal" options={{ presentation: "modal", }} />
        {/* Policies Info Modal */}
        <Stack.Screen name="(modals)/policiesModal" options={{ presentation: "modal", }} />


      </Stack>

    </ThemePicker>
  )
}

export default _layout

const styles = StyleSheet.create({})
