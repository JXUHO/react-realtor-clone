// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg2Qexp8xFZ4fvEJiL56YIInOdp8ZP22A",
  authDomain: "realtor-clone-react-e3d60.firebaseapp.com",
  projectId: "realtor-clone-react-e3d60",
  storageBucket: "realtor-clone-react-e3d60.appspot.com",
  messagingSenderId: "759450121491",
  appId: "1:759450121491:web:14ddb7d0b709dda8f756e6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();