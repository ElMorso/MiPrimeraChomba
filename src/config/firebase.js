import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "process.env.REACT_APP_API_KEY",
    authDomain: "mi-primera-chomba.firebaseapp.com",
    projectId: "mi-primera-chomba",
    storageBucket: "mi-primera-chomba.appspot.com",
    messagingSenderId: "1003848488742",
    appId: "1:1003848488742:web:99b8ddb39b16c5030653e7",
    measurementId: "G-5YG4XMDVC8"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);