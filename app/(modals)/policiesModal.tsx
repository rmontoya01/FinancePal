import { Alert, StatusBar, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/themes'
import Ionicons from '@expo/vector-icons/Ionicons'
import PreviousButton from '@/components/PreviousButton'
import Header from '@/components/Header'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { IncomeType } from '@/types'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { scale } from '@/utils/styling'

const policiesModal = () => {
    return (

        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title="Privacy Policy"
                    rightIcon={<PreviousButton />}
                    style={{ marginBottom: spacingY._7 }}
                />
                <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Typo fontWeight="bold" style={styles.heading}>Effective Date: April 21, 2025</Typo>

                    <Typo style={styles.text}>
                        Welcome to FinancePal! Your privacy is important to us. This Privacy Policy explains how we collect,
                        use, disclose, and safeguard your information when you use our mobile application.
                    </Typo>

                    <Typo fontWeight="bold" style={styles.subheading}>1. Information We Collect</Typo>
                    <Typo style={styles.text}>We may collect:</Typo>
                    <Typo style={styles.text}>- Personal Information (e.g. name, email)</Typo>
                    <Typo style={styles.text}>- Financial Data (e.g. income, expenses)</Typo>
                    <Typo style={styles.text}>- Device & Usage Data</Typo>

                    <Typo fontWeight="bold" style={styles.subheading}>2. How We Use Your Information</Typo>
                    <Typo style={styles.text}>
                        We use your data to provide budgeting tools, improve the app, and enhance your experience. We do not sell your data.
                    </Typo>

                    <Typo fontWeight="bold" style={styles.subheading}>3. Data Security</Typo>
                    <Typo style={styles.text}>
                        We use AWS and encryption protocols to protect your information, but no system is 100% secure.
                    </Typo>

                    <Typo fontWeight="bold" style={styles.subheading}>4. Data Sharing</Typo>
                    <Typo style={styles.text}>
                        We only share data with trusted third-party services needed to run FinancePal (e.g. cloud storage).

                        Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:

                        AWS Services
                        Google Analytics for Firebase
                        Firebase Crashlytics
                        Expo
                    </Typo>

                    <Typo fontWeight="bold" style={styles.subheading}>5. User Rights</Typo>
                    <Typo style={styles.text}>
                        You can view, update, or delete your personal information at any time by contacting support. You have the right to request access to your data, request deletion, and opt-out of data sharing.
                    </Typo>

                    <Typo fontWeight="bold" style={styles.subheading}>6. Children’s Privacy</Typo>
                    <Typo style={styles.text}>
                        FinancePal does not knowingly collect data from users under 13 years old. If we become aware of such data, we will delete it.

                        Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
                    </Typo>

                    <Typo fontWeight="bold" style={styles.subheading}>7. Changes to this Policy</Typo>
                    <Typo style={styles.text}>
                        We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.

                        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.Continued use of the app means you accept any updates.
                    </Typo>

                    <Typo fontWeight="bold" style={styles.subheading}>8. Contact Us</Typo>
                    <Typo style={styles.text}>
                        If you have any questions about this Privacy Policy, You can contact us by email at FinancePal@FinancePal.com or rmontoya01@aurora.edu.
                    </Typo>
                </ScrollView>
            </View>
        </ModalWrapper>

    )
}

export default policiesModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral900,
        flex: 1,
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._25,
        // paddingBottom: spacingY._25,
        // gap: spacingY._25,
    },
    scrollContent: {
        paddingBottom: spacingY._20,
    },
    heading: {
        color: colors.neutral100,
        marginBottom: spacingY._5,
    },
    subheading: {
        color: colors.neutral100,
        marginTop: spacingY._7,
        marginBottom: spacingY._5,
        // fontSize: scale(16),
    },
    text: {
        color: colors.neutral200,
        marginBottom: spacingY._5,
        // lineHeight: 22,
    },
})
