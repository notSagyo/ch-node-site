// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'coder-node.firebaseapp.com',
  projectId: 'coder-node',
  storageBucket: 'coder-node.appspot.com',
  messagingSenderId: '1039685905642',
  appId: '1:1039685905642:web:548b9857db188d2239fb93',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
