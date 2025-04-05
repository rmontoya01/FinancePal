import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhJBpK-R80iKDz7Oj2ywTrA-E8mF9IURw",
  authDomain: "financepal-d24d5.firebaseapp.com",
  projectId: "financepal-d24d5",
  storageBucket: "financepal-d24d5.firebasestorage.app",
  messagingSenderId: "156937833676",
  appId: "1:156937833676:web:e0df78afd3fe1265178669",
  measurementId: "G-GBF5RS9YK4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
// Initialize only once
//const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
//const auth = getAuth(app);
//const db = getFirestore(app);
//export { auth, db };
