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
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
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

export async function updateMainItem({ documentName, url }) {
  const collection_ref = collection( db, 'video' );
  const error = ref( null );
  try {
    const item = doc( collection_ref, documentName );
    await updateDoc( item, { url });
  } catch ( err ) {
    error.value = err.message;
  }
  return error;
}


export async function deleteItem({ category, id }) {
  const video_ref = doc(db, `video/${ category }`);
  const ids_ref = collection( video_ref, 'ids' );
  try {
    const id_ref = doc(ids_ref, id);
    await deleteDoc( id_ref );
    return true;
  } catch (err) {
    console.error( err.message );
    return err;
  }
}

export async function updateItem({ category, id, newVal }) {
  const video_ref = doc(db, `video/${ category }`);
  const ids_ref = collection( video_ref, 'ids' );
  try {
    const id_ref = doc(ids_ref, id);
    await updateDoc( id_ref, { url: newVal } );
    return true;
  } catch (err) {
    console.error( err.message );
    return err;
  }
}

export async function addItem({ category, url }) {
  const video_ref = doc(db, `video/${ category }`);
  const ids_ref = collection( video_ref, 'ids' );
  try {
    await addDoc( ids_ref, {url} );
    return true;
  } catch (err) {
    console.error( err.message );
    return err;
  }
}

export async function getVideo({ category }) {
  const res = ref( null );
  const arr = [];
  const video_ref = doc(db, `video/${ category }`);
  const ids_ref = collection( video_ref, 'ids' );
  try {
    res.value = await getDocs( ids_ref );
    res.value.forEach( doc => {
      arr.push({ ...doc.data(), id: doc.id });    
    });
  } catch (err) {
    return err;
  }
  return arr;
}

export async function getMainVideo({ path }) {
  const res = ref( null );
  const main_ref = doc( db, path );
  try {
    res.value = await getDoc( main_ref );
  } catch (err) {
    console.error( err.message );
  }
  return res;
}