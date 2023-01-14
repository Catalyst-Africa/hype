import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrWHVwNJEosfYSYXjE_9exVH8X1JiNrqc",
  authDomain: "hype-d334e.firebaseapp.com",
  projectId: "hype-d334e",
  storageBucket: "hype-d334e.appspot.com",
  messagingSenderId: "999733945114",
  appId: "1:999733945114:web:fc04ee37a8488ceb5ec2a3",
  measurementId: "G-8DESBKP18Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const actionCodeSettings = {
  url: "https://project-artemis.netlify.app/auth/login",
  handleCodeInApp: true,
};
