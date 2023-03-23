// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "next-prisma-commerce.firebaseapp.com",
    projectId: "next-prisma-commerce",
    storageBucket: "next-prisma-commerce.appspot.com",
    messagingSenderId: "367793670862",
    appId: "1:367793670862:web:7c326408b3bfabf76ade9f",
    measurementId: "G-4HNB6MPLRE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const storage = getStorage(app);
