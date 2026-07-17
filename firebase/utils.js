//==============================
// Import
//==============================
import {
  ref,
} from 'vue';

import {
  db,
  auth,
} from '../firebase/config';
import {
  doc,
  query,
  getDoc,
  setDoc,
  addDoc,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { getStorage, removeStorage, setStorage } from '../src/utils/storage.js';
import { apiGetYouTubeData } from '../src/utils/apis.js';


//==============================
// Functions
//==============================
function _checkAuth() {
  const res = ref(null);
  onAuthStateChanged(auth, (data) => {
    res.value = data;
  });
  return res;
}


export async function login({ email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return _checkAuth();
  } catch (err) {
    console.error('Login error:', err.message);
    return err.message;
  }
}


export async function signin({ email, password }) {
  const error = ref(null);
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    error.value = err.message;
  }

  return error;
}


export async function deleteItem({ category, id }) {
  const video_ref = doc(db, `video/${category}`);
  const ids_ref = collection(video_ref, 'ids');
  try {
    const id_ref = doc(ids_ref, id);
    await deleteDoc(id_ref);
    removeStorage(`video:${category}`);
    return true;
  } catch (err) {
    console.error(err.message);
    return err;
  }
}


export async function updateItem({ category, id, yt_id }) {
  const data = await apiGetYouTubeData(yt_id);

  const docRef =
    category === 'main'
      ? doc(db, 'video', 'main')
      : doc(db, 'video', category, 'ids', id);

  try {
    await updateDoc(docRef, data);
    removeStorage(`video:${category}`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}


export async function addItem({ category, yt_id }) {
  const video_ref = doc(db, `video/${category}`);
  const ids_ref = collection(video_ref, 'ids');
  const newDocRef = doc(ids_ref);
  const data = await apiGetYouTubeData(yt_id);

  try {
    await setDoc(newDocRef, { ...data, firebase_id: newDocRef.id, createdAt: serverTimestamp() });
    removeStorage(`video:${category}`);
    return true;
  } catch (err) {
    console.error(err.message);
    return err;
  }
}


export async function getItem({ category }) {
  const cacheKey = `video:${category}`;

  // Check cache first
  const cached = getStorage(cacheKey);
  if (cached) {
    console.log('Using cached data');
    return cached;
  }

  console.log('Fetching fresh data');

  try {
    const videoRef = doc(db, `video/${category}`);

    if (category === "main") {
      const snapshot = await getDoc(videoRef);
      const data = snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
      setStorage(cacheKey, data);
      return data;
    }

    const snapshot = await getDocs(query(collection(videoRef, "ids"), orderBy("createdAt", "desc")));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Save in cache
    setStorage(cacheKey, data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


export async function loadEvents() {
  const events_ref = query(collection(db, 'events'), orderBy('year'));
  const data = ref([]);
  const docs = ref([]);
  try {
    data.value = await getDocs(events_ref);
    data.value.forEach(d => docs.value.push({ ...d.data(), id: d.id }))
    return docs.value;
  } catch (err) {
    return err;
  }
}


export async function addEvent(obj) {
  const events_ref = collection(db, 'events');
  try {
    const newEvent = { ...obj, createdAt: serverTimestamp() };
    await addDoc(events_ref, newEvent);
    return true;
  } catch (err) {
    console.error(err.message);
    return err;
  }
}

//================================
// Debug
//================================

export async function _updateDocDebug({ documentPath, data }) {
  try {
    const docRef = doc(db, documentPath);
    await updateDoc(docRef, data);
    console.log("Successfully updated");
  } catch (err) {
    console.error("Update error:", err);
    throw err;
  }
}


export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
