// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCfC1gHfNmGUMz0SE2J3ZFEDWYxzVLZ9vk",
  authDomain: "whatsappclone-27d1b.firebaseapp.com",
  projectId: "whatsappclone-27d1b",
  storageBucket: "whatsappclone-27d1b.appspot.com",
  messagingSenderId: "833002235044",
  appId: "1:833002235044:web:ef1fb43fb62a92c263f231",
  measurementId: "G-T264GFLMV8"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);