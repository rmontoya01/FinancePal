import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { QueryConstraint } from 'firebase/firestore'

const fetchMyBudget = (
    dataName: string,
    constraints: QueryConstraint[] = []
) => {

    // const [data, setData] = useState<any>(null)

    // const [isLoading, setIsLoading] = useState(true)

    // const [error, setError] = useState<string> | null>(null)

    // useEffect(() => {
    //     if(!dataName) return;
    //     const collectionRef = collection(firestore, dataName);
    //     const query = query(collectionRef, ...constraints);

    //     const unsubscribe = onSnapshot(query, (snapshot) => {
    // }, [dataName])

    return (
        <View>
            <Text>fetchMyBudget</Text>
        </View>
    )
}

export default fetchMyBudget

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
})
