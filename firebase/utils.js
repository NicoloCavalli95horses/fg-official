//==============================
// Import
//==============================
import { 
  db,
  auth,
} from '../firebase/config'
import { 
  doc,
  getDoc,
  updateDoc,
  collection,
} from 'firebase/firestore'
import { ref } from 'vue'

import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'


//==============================
// Consts
//==============================
const collection_ref = collection( db, 'video' );


//==============================
// Functions
//==============================
export async function login({email, password}) {
  const error = ref( null );
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch ( err ) {
    error.value = err.message;
  }

  return error;
}


export async function signin({email, password}) {
  const error = ref( null );
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    error.value = err.message;
  }

  return error;
}

export async function updateItem({ documentName, url }) {
  const error = ref( null );
  try {
    const item = doc( collection_ref, documentName );
    await updateDoc( item, { url });
  } catch ( err ) {
    error.value = err.message;
  }
  return error;
}

export async function getItem({ documentName }) {
  const res = ref( null );
  try {
    const item = doc( collection_ref, documentName );
    res.value = await getDoc( item );
  } catch (err) {
    console.error( err.message );
  }
  return res;
}