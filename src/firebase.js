// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO8gD1_99pvla7vYIrRAYAAfX6QmylQ1A",
  authDomain: "smarthomecontrol-bb12a.firebaseapp.com",
  projectId: "smarthomecontrol-bb12a",
  storageBucket: "smarthomecontrol-bb12a.appspot.com",
  messagingSenderId: "774436540141",
  appId: "1:774436540141:web:3dac7507247906c132c6e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)