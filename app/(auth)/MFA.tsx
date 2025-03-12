import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const checkEmailVerification = async () => {
    try {
        const user = auth().currentUser;
        if (user && !user.emailVerified) {
            await user.sendEmailVerification();
            console.log('Verification email sent.');
        } else {
            console.log('Email is already verified.');
        }
    } catch (error) {
        console.error('Error sending email verification:', error);
    }
};

const MFA = () => {
    const [multiFactorUser, setMultiFactorUser] = useState<FirebaseAuthTypes.MultiFactorUser | null>(null);

    useEffect(() => {
        const fetchMultiFactorUser = async () => {
            try {
                const user = auth().currentUser;
                if (user) {
                    const mfaUser = await auth().multiFactor(user);
                    setMultiFactorUser(mfaUser);
                }
            } catch (error) {
                console.error('Error fetching multi-factor user:', error);
            }
        };

        fetchMultiFactorUser();
    }, []);

    return (
        <View>
            {multiFactorUser ? (
                <Text>Multi-Factor User: {JSON.stringify(multiFactorUser)}</Text>
            ) : (
                <Text>Loading multi-factor user...</Text>
            )}
        </View>
    );
};

const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        console.log('User signed in successfully.');
    } catch (error) {
        const { code } = error as any;
        if (code === 'auth/multi-factor-auth-required') {
            console.log('Multi-factor authentication is required.');
            return;
        }
        console.error('Error signing in:', error);
    }
};


export default MFA;