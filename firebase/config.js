import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2A_viicYnbqaqtZb7Rh5Iqe_nMKgHQc4",
  authDomain: "fg-project-5de5c.firebaseapp.com",
  projectId: "fg-project-5de5c",
  storageBucket: "fg-project-5de5c.appspot.com",
  messagingSenderId: "546968056964",
  appId: "1:546968056964:web:27d7814bec4f13916cfed1",
  measurementId: "G-9WG9DZ3D84"
};

// init firebase
initializeApp( firebaseConfig );
const db = getFirestore();
const auth = getAuth();

export { db, auth }