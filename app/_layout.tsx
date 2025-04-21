import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";
import { Presentation } from 'phosphor-react-native';

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>

      {/* Main Stack */}

      {/* To confirm modals, edit it inline here */}
      {/* Income Modal */}
      <Stack.Screen name="(modals)/incomeModal" options={{ presentation: "modal", }} />
      {/* Spendings Modal */}
      <Stack.Screen name="(modals)/spendingsModal" options={{ presentation: "modal", }} />
      {/* App Info Modal */}
      {/* <Stack.Screen name="(modals)/appInfoModal" options={{ presentation: "modal", }} /> */}

    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({

})