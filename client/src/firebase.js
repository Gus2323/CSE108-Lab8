import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1xkIuLs8PtR0ee5-YaQIe6iQdfiqRMB8",
  authDomain: "cse108-lab8.firebaseapp.com",
  projectId: "cse108-lab8",
  storageBucket: "cse108-lab8.firebasestorage.app",
  messagingSenderId: "836081865659",
  appId: "1:836081865659:web:3ca3ae1caddb7153c0aa9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
export const auth = getAuth(app);
export const db = getFirestore(app);
