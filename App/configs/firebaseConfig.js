// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt0my-PeDHVJYaum0OPT_uy6YGMDGHG14",
  authDomain: "studyinkorea-1011.firebaseapp.com",
  projectId: "studyinkorea-1011",
  storageBucket: "studyinkorea-1011.firebasestorage.app",
  messagingSenderId: "350760981381",
  appId: "1:350760981381:web:e63b52fed689f3287a6aec",
  measurementId: "G-VL48BKPM3G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);