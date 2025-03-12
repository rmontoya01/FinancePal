import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';

const MFATest = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [email, setEmail] = useState('');
    const [emailVerificationCode, setEmailVerificationCode] = useState('');

    const sendPhoneVerificationCode = async () => {
        try {
            const currentUser = auth().currentUser;
            if (!currentUser) {
                throw new Error('No current user');
            }
            const multiFactorUser = currentUser.multiFactor;
            if (!currentUser) {
                throw new Error('No current user');
            }
            const session = await currentUser.getIdToken(true);
            const phoneOptions = {
                phoneNumber,
                session,
            };

            // Sends a text message to the user
            const verificationId = await auth().verifyPhoneNumberForMultiFactor(phoneOptions);
            setVerificationId(verificationId);
        } catch (error) {
            console.error(error);
        }
    };

    const verifyPhoneCode = async () => {
        try {
            const cred = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
            const multiFactorAssertion = auth.PhoneMultiFactorGenerator.assertion(cred);
            const currentUser = auth().currentUser;
            if (!currentUser) {
                throw new Error('No current user');
            }
            const multiFactorUser = currentUser.multiFactor;
            if (multiFactorUser) {
                const currentUser = auth().currentUser;
                if (!currentUser) {
                    throw new Error('No current user');
                }
                await multiFactorUser.enroll(multiFactorAssertion, 'Phone');
            } else {
                throw new Error('Multi-factor user is null');
            }
            alert('Multi-factor authentication with phone enrolled successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const sendEmailVerificationCode = async () => {
        try {
            const currentUser = auth().currentUser;
            if (!currentUser) {
                throw new Error('No current user');
            }
            const multiFactorUser = currentUser.multiFactor;
            if (!multiFactorUser) {
                throw new Error('Multi-factor user is null');
            }
            const session = await auth().currentUser.getIdToken(true);
            const emailOptions = {
                email,
                session,
            };

            // Sends an email to the user
            await auth().sendSignInLinkToEmail(email, {
                handleCodeInApp: true,
                url: 'https://your-app-url.com/finishSignUp?cartId=1234',
                iOS: {
                    bundleId: 'com.example.ios'
                },
                android: {
                    packageName: 'com.example.android',
                    installApp: true,
                    minimumVersion: '12'
                },
                dynamicLinkDomain: 'example.page.link'
            });
            alert('Verification email sent');
            setVerificationId(verificationId);
        } catch (error) {
            console.error(error);
        }
    };

    const verifyEmailCode = async () => {
        try {
            const cred = auth.EmailAuthProvider.credential(email, emailVerificationCode);
            const multiFactorAssertion = auth.PhoneMultiFactorGenerator.assertion(cred);
            const currentUser = auth().currentUser;
            if (!currentUser) {
                throw new Error('No current user');
            }
            const multiFactorUser = currentUser.multiFactor;
            if (multiFactorUser) {
                if (currentUser.multiFactor) {
                    const session = await multiFactorUser.getSession();
                    await multiFactorUser.enroll(multiFactorAssertion, session);
                } else {
                    throw new Error('Multi-factor user is null');
                }
            } else {
                throw new Error('Multi-factor user is null');
            }
            alert('Multi-factor authentication with email enrolled successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Button title="Send Phone Verification Code" onPress={sendPhoneVerificationCode} />
            <TextInput
                placeholder="Phone Verification Code"
                value={verificationCode}
                onChangeText={setVerificationCode}
            />
            <Button title="Verify Phone Code" onPress={verifyPhoneCode} />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Send Email Verification Code" onPress={sendEmailVerificationCode} />
            <TextInput
                placeholder="Email Verification Code"
                value={emailVerificationCode}
                onChangeText={setEmailVerificationCode}
            />
            <Button title="Verify Email Code" onPress={verifyEmailCode} />
        </View>
    );
};

export default MFATest;