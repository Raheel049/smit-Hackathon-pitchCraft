// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDefZtEWDQ_lD9BlSKXPz3e8YEY5dBTtS8",
  authDomain: "pitch-craft-5ffe1.firebaseapp.com",
  projectId: "pitch-craft-5ffe1",
  storageBucket: "pitch-craft-5ffe1.firebasestorage.app",
  messagingSenderId: "444395388989",
  appId: "1:444395388989:web:8ca4666afb5cdd7b01aa54",
  measurementId: "G-F6DK55EBDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
// const analytics = getAnalytics(app);


