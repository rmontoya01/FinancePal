import { IncomeType } from "@/types";

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

        return { result: true, data: incomeToSave } as unknown as ResponseType; // Replace with actual ResponseType object
    } catch (error) {
        const errorMessage = (error as Error).message;
        return { result: false, error: errorMessage } as unknown as ResponseType; // Replace with actual ResponseType object
    }

    // const incomeRef = incomeData?.id
}