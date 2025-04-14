import { Alert, StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/themes';
import Ionicons from '@expo/vector-icons/Ionicons';
import PreviousButton from '@/components/PreviousButton';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { IncomeType, ExpenseType } from '@/types';
import { useRouter } from 'expo-router';
import { scale } from '@/utils/styling';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesModal = () => {
    const [Expenses, setExpenses] = useState<ExpenseType>({
        expense_id: 0,
        user_id: 0,
        amount: 0,
        category: "",
        description: "",
        created_at: new Date(),
    });
    const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility
    const router = useRouter();

    const ExpenseTypes = [
        "Groceries",
        "Rent",
        "Utilities",
        "Transportation",
        "Entertainment",
        "Healthcare",
        "Dining Out",
        "Shopping",
        "Savings",
        "Other"
    ];

    const onSubmit = async () => {
        let { amount, category, description } = Expenses;
        if (!amount || !category?.trim() || !description?.trim()) {
            Alert.alert("Expenses", "Please fill in all of the fields!");
            return;
        }

        try {
            const user_id = await AsyncStorage.getItem('user_id');
            if (!user_id) {
                Alert.alert("Expenses", "User not logged in.");
                return;
            }

            const data: ExpenseType = {
                user_id: parseInt(user_id),
                amount,
                category,
                description,
                created_at: new Date(),
            };

            // Sending the POST request
            const response = await fetch('http://18.226.82.202:3000/expenses', {  // Fixed endpoint to lowercase 'e'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseText = await response.text(); // Get the raw response as text
            console.log('Response Text:', responseText);  // Log the raw response

            // Try to parse the raw response as JSON
            try {
                const result = JSON.parse(responseText); // Parse the raw response into JSON
                console.log('result: ', result);

                if (result?.status === 'success') {
                    router.back();
                } else {
                    Alert.alert("Expenses", "Failed to save expenses.");
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);  // Handle any JSON parsing errors
                Alert.alert("Expenses", "Failed to parse server response.");
            }

        } catch (error) {
            console.error("Submit Error:", error);
            Alert.alert("Expenses", "Something went wrong.");
        }
    };


    const handleCategorySelect = (category: string) => {
        setExpenses({ ...Expenses, description: category });
        setModalVisible(false); // Close the modal after selection
    };

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header title="New Expenses" rightIcon={<PreviousButton />} style={{ marginBottom: spacingY._7 }} />

                {/* Entry Input Slots */}
                <ScrollView contentContainerStyle={styles.form}>
                    {/* Expense Name */}
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Expense Desc</Typo>
                        <Input
                            placeholder='Expense Name'
                            value={Expenses.category}
                            onChangeText={(value) => setExpenses({ ...Expenses, category: value })} />
                    </View>

                    {/* Expense Cost */}
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Expense Cost</Typo>
                        <Input
                            placeholder='Expense Cost'
                            value={String(Expenses.amount)}
                            onChangeText={(value) => setExpenses({ ...Expenses, amount: parseFloat(value) || 0 })} />
                    </View>

                    {/* Expense Type Selection */}
                    <View style={styles.textContainer}>
                        <Typo color={colors.neutral200}>Expense Type</Typo>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setModalVisible(true)} // Open the modal when clicked
                        >
                            <Ionicons name="chevron-down" size={20} color={colors.neutral200} style={styles.icon} />
                            <Text style={styles.dropdownText}>{Expenses.description || 'Select a Type'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Modal for selecting Expense type */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)} // Close modal when back button is pressed
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            {ExpenseTypes.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={styles.modalItem}
                                    onPress={() => handleCategorySelect(type)} // Set the selected type
                                >
                                    <Text style={styles.modalItemText}>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>
            </View>

            <View style={styles.footer}>
                <Button onPress={onSubmit} style={{ flex: 2 }}>
                    <Typo color={colors.white} fontWeight={"600"}>
                        Add Expense
                    </Typo>
                </Button>
            </View>
        </ModalWrapper>
    );
};

export default ExpensesModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral900,
        flex: 1,
        paddingHorizontal: spacingX._20,
        gap: spacingY._25,
    },
    form: {
        gap: spacingY._25
    },
    textContainer: {
        gap: spacingY._12,
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: spacingX._15,
        gap: scale(10),
        paddingTop: spacingY._25,
        borderTopColor: colors.neutral800,
        marginBottom: spacingY._40,
        borderTopWidth: 1,
    },
    // Styled dropdown button
    dropdownButton: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        backgroundColor: colors.neutral800,
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacingY._12,
        borderWidth: 1,
        borderColor: colors.neutral700,
    },
    icon: {
        position: 'absolute',
        right: 10,
    },
    dropdownText: {
        color: colors.neutral200,
        fontSize: 16,
    },
    // Modal styles
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    },
    modalContainer: {
        width: '80%',
        backgroundColor: colors.neutral900,
        borderRadius: 12,
        paddingVertical: spacingY._7,
        paddingHorizontal: spacingX._10,
    },
    modalItem: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral700,
        borderRadius: 8,
        marginBottom: spacingY._5,
    },
    modalItemText: {
        color: colors.neutral200,
        fontSize: 16,
        textAlign: 'center',
    },
});
