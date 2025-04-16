import { Alert, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router';

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import { spacingY, spacingX } from '@/constants/themes';
import Typo from '@/components/Typo';
import { colors } from '@/constants/themes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/styling';
import Button from "@/components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {

  const router = useRouter();
  const [verifyUsername, setVerifyUsername] = useState('');
  const [showVerifyInput, setShowVerifyInput] = useState(false);
  const [storedUsername, setStoredUsername] = useState('');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user_token');
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('username');
      console.log("User logged out. AsyncStorage cleared.");
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const startDeleteVerification = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      if (!savedUsername) {
        Alert.alert('Error', 'No username found.');
        return;
      }
      setStoredUsername(savedUsername);
      setShowVerifyInput(true);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const confirmAndDeleteUser = async () => {
    if (verifyUsername.trim() !== storedUsername.trim()) {
      Alert.alert('Error', 'Username does not match.');
      return;
    }

    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (!user_id) {
        Alert.alert('Error', 'User ID not found.');
        return;
      }

      const response = await fetch(`http://18.226.82.202:3000/users/${user_id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        await AsyncStorage.clear();
        console.log('User deleted and storage cleared.');
        router.replace('/(auth)/login');
      } else {
        const data = await response.json();
        Alert.alert('Failed to delete user', data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete user.');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <PreviousButton iconSize={30} />

        <View style={{ gap: 2, marginTop: spacingY._5, alignItems: 'center' }}>
          <Typo size={34} fontWeight={"700"}>
            Settings
          </Typo>
          <Typo size={30} fontWeight={"700"}>
            Page
          </Typo>
        </View>

        {/* Light/Dark Mode */}
        <Animated.View
          entering={FadeInDown.duration(1100).delay(210).springify().damping(12)}
          style={styles.buttonContainer}>
          <Button>
            <Typo size={18} fontWeight={"500"} color={colors.white}>Light/Dark Mode</Typo>
          </Button>
        </Animated.View>

        {/* Other Settings */}
        <View style={styles.buttonContainer}>
          <Button>
            <Typo size={18} fontWeight={"500"} color={colors.white}>Other Settings</Typo>
          </Button>
        </View>

        {/* App Info */}
        <View style={styles.buttonContainer}>
          <Button>
            <Typo size={18} fontWeight={"500"} color={colors.white}>App Info</Typo>
          </Button>
        </View>

        {/* Delete User */}
        <View style={styles.buttonContainer}>
          {showVerifyInput ? (
            <>
              <Typo size={16} color={colors.text}>Please verify your username</Typo>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#aaa"
                value={verifyUsername}
                onChangeText={setVerifyUsername}
              />
              <Button onPress={confirmAndDeleteUser}>
                <Typo size={18} fontWeight={"500"} color={colors.white}>Confirm Delete</Typo>
              </Button>
            </>
          ) : (
            <Button onPress={startDeleteVerification}>
              <Typo size={18} fontWeight={"500"} color={colors.white}>Delete User</Typo>
            </Button>
          )}
        </View>

        {/* Logout */}
        <View style={styles.buttonContainer}>
          <Button onPress={handleLogout}>
            <Typo size={18} fontWeight={"500"} color={colors.white}>Logout</Typo>
          </Button>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Button onPress={() => router.replace('/(tabs)')}>
          <Typo size={18} fontWeight={"500"} color={colors.white}>Return & Confirm</Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._25,
    paddingHorizontal: spacingX._20,
  },
  formSubtitle: {
    gap: spacingY._17,
  }, // button style here
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._40,
  },
  footerContainer: {
    width: "100%",
    paddingHorizontal: spacingX._40,
    paddingBottom: spacingY._40,
    gap: 2,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 15,
    color: colors.text,
    backgroundColor: colors.neutral800,
  },
});
