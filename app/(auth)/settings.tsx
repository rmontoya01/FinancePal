import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import ScreenWrapper from '@/components/ScreenWrapper';
import PreviousButton from '@/components/PreviousButton';
import Typo from '@/components/Typo';
import Button from '@/components/Button';
import { spacingY, spacingX, colors } from '@/constants/themes';
import { gradientPresets } from '@/components/ScreenWrapper';

export default function Settings() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [verifyUsername, setVerifyUsername] = useState('');
  const [storedUsername, setStoredUsername] = useState('');

  const handleSetTheme = async (themeName: string) => {
    await AsyncStorage.setItem('selectedTheme', themeName);
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['user_token', 'user_id', 'username']);
    router.replace('/(auth)/login');
  };

  const startDeleteVerification = async () => {
    const savedUsername = await AsyncStorage.getItem('username');
    if (!savedUsername) {
      Alert.alert('Error', 'No username found.');
      return;
    }
    setStoredUsername(savedUsername);
  };

  const confirmAndDeleteUser = async () => {
    if (verifyUsername.trim() !== storedUsername.trim()) {
      Alert.alert('Error', 'Username does not match.');
      return;
    }

    const user_id = await AsyncStorage.getItem('user_id');
    if (!user_id) return;

    const res = await fetch(`http://18.226.82.202:3000/users/${user_id}`, { method: 'DELETE' });
    if (res.status === 200) {
      await AsyncStorage.clear();
      router.replace('/(auth)/login');
    } else {
      Alert.alert('Error', 'Could not delete user.');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <PreviousButton iconSize={30} />

        <View style={{ gap: 2, marginTop: spacingY._5, alignItems: 'center' }}>
          <Typo size={34} fontWeight="700">Settings</Typo>
          <Typo size={30} fontWeight="700">Page</Typo>
        </View>

        {/* Background Theme */}
        <View style={styles.buttonContainer}>
          <Button onPress={() => setShowDropdown(!showDropdown)}>
            <Typo size={18} fontWeight="500" color={colors.white}>Background Theme</Typo>
          </Button>
          {showDropdown && (
            <View style={styles.dropdown}>
              <FlatList
                data={Object.keys(gradientPresets)}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSetTheme(item)}>
                    <Typo style={styles.dropdownItem}>{item}</Typo>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          )}
        </View>

        {/* App Info */}
        <View style={styles.buttonContainer}>
          <Button onPress={() => router.push('/(modals)/appInfoModal')}>
            <Typo size={18} fontWeight="500" color={colors.white}>App Info</Typo>
          </Button>
        </View>

        {/* Policies */}
        <View style={styles.buttonContainer}>
          <Button onPress={() => router.push('/(modals)/policiesModal')}>
            <Typo size={18} fontWeight="500" color={colors.white}>Privacy Policy</Typo>
          </Button>
        </View>

        {/* Delete User */}
        <View style={styles.buttonContainer}>
          {storedUsername ? (
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
                <Typo color="white">Confirm Delete</Typo>
              </Button>
            </>
          ) : (
            <Button onPress={startDeleteVerification}>
              <Typo color="white">Delete User</Typo>
            </Button>
          )}
        </View>

        {/* Logout */}
        <View style={styles.buttonContainer}>
          <Button onPress={handleLogout}>
            <Typo color="white">Logout</Typo>
          </Button>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Button onPress={() => router.replace('/(tabs)')}>
          <Typo color="white">Return & Confirm</Typo>
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
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacingX._40,
  },
  footerContainer: {
    width: '100%',
    paddingHorizontal: spacingX._40,
    paddingBottom: spacingY._40,
    gap: 2,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    color: colors.text,
    backgroundColor: colors.neutral800,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 10,
    color: 'white',
  },
});
