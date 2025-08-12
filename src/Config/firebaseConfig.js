// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFbUwBzAMYZ3nyzLe9_U1cuWPiq6gld8A",
  authDomain: "theeagles-3a2c0.firebaseapp.com",
  projectId: "theeagles-3a2c0",
  storageBucket: "theeagles-3a2c0.firebasestorage.app",
  messagingSenderId: "473295511878",
  appId: "1:473295511878:web:aedc23cf21f648993e4547",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
