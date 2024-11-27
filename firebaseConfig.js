// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWoQwRUC5xYY5lVxlKDxvV6rNi_Crh-qQ",
  authDomain: "todolist-80805.firebaseapp.com",
  projectId: "todolist-80805",
  storageBucket: "todolist-80805.firebasestorage.app",
  messagingSenderId: "504453622463",
  appId: "1:504453622463:web:8c8031d405e7fbc272340a",
  measurementId: "G-14FLCTESZ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const FIRESTORE_BD = getFirestore(app);
