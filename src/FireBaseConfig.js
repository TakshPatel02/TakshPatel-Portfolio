// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const env = import.meta.env;

const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY || env.REACT_APP_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: env.VITE_FIREBASE_DATABASE_URL || env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: env.VITE_FIREBASE_PROJECT_ID || env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID || env.REACT_APP_FIREBASE_APP_ID,
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;