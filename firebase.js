// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZz6nDjtuaQT1TCHNH19fjwmDgB74yQaw",
  authDomain: "chat-e9c29.firebaseapp.com",
  projectId: "chat-e9c29",
  storageBucket: "chat-e9c29.appspot.com",
  messagingSenderId: "1093228755550",
  appId: "1:1093228755550:web:acf4473983e329ca0f12cf",
  measurementId: "G-FE76PLWT56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'us-east1');
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app)

export {app, analytics, auth, firestore, storage}