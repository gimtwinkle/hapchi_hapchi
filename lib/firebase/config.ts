// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGGIB427dRMX0OTgCpGlhr3OxR28rxDTc",
  authDomain: "hapchihapchi-678ea.firebaseapp.com",
  projectId: "hapchihapchi-678ea",
  storageBucket: "hapchihapchi-678ea.firebasestorage.app",
  messagingSenderId: "557160337912",
  appId: "1:557160337912:web:4e5b022af5d7ed71c6060d",
  measurementId: "G-4QK7EDKY9Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
