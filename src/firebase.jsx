// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCgYWDW2C8GJZfsQEypktx1QoYoAsFXhY",
  authDomain: "kill-bill-f3da6.firebaseapp.com",
  projectId: "kill-bill-f3da6",
  storageBucket: "kill-bill-f3da6.appspot.com",
  messagingSenderId: "175365065571",
  appId: "1:175365065571:web:3426c757bd9a5e2519a156",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
