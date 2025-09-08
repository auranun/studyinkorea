{/*import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'; */}
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDt0my-PeDHVJYaum0OPT_uy6YGMDGHG14",
  authDomain: "studyinkorea-1011.firebaseapp.com",
  projectId: "studyinkorea-1011",
  storageBucket: "studyinkorea-1011.appspot.app",
  messagingSenderId: "350760981381",
  appId: "1:350760981381:web:e63b52fed689f3287a6aec",
  measurementId: "G-VL48BKPM3G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, firestore, db, storage };