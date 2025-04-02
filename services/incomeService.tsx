import { IncomeType } from "@/types";
import { ResponseType } from "@/types";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const createOrUpdateIncome = async (
    incomeData: Partial<IncomeType>
): Promise<ResponseType> => {
    try {
        let incomeToSave = { ...incomeData };

        if (!incomeData.id) {
            // new income
            incomeToSave.amount = 0;
            incomeToSave.totalIncome = 0;
            incomeToSave.totalExpenses = 0;
            incomeToSave.created = new Date();
        }

        const incomeRef = incomeData.id ? doc(db, "income", incomeData.id) : doc(db, "income", incomeData.name);
        const incomeDoc = await getDoc(incomeRef);

        await setDoc(incomeRef, incomeToSave, { merge: true });

        return { result: true, data: incomeToSave } as unknown as ResponseType; // Replace with actual ResponseType object
    } catch (error) {
        const errorMessage = (error as Error).message;
        return { result: false, error: errorMessage } as unknown as ResponseType; // Replace with actual ResponseType object
    }

    // const incomeRef = incomeData?.id
}