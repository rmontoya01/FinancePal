// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from 
"firebase/auth";
import { auth } from '@/utils/firebaseConfig';


export default function useAuth(): { user: User | null; updateUserData: any } {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                console.log("✅ Logged in user:", firebaseUser.uid);
            } else {
                setUser(null);
                console.log("⚠️ No user logged in.");
            }
        });

        return () => unsubscribe();
    }, []);

    const updateUserData = (userId: string) => {
        console.log(`User data updated for userId: ${userId}`);
        // Add logic to refresh or fetch user data here
    };

    return { user, updateUserData };
}