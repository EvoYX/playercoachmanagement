// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdMgs-yk6QSISgh3v_9_rm1IyxIXhn3Og",
  authDomain: "seychelles-football-federation.firebaseapp.com",
  projectId: "seychelles-football-federation",
  storageBucket: "seychelles-football-federation.appspot.com",
  messagingSenderId: "7334955942",
  appId: "1:7334955942:web:ee20e8ae9f7aca18b95d67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
