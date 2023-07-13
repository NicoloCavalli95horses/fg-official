import { ref } from 'vue'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const error = ref(null);
const is_pending = ref(false);

async function signUp(email, password) {
  error.value = null;
  is_pending.value = true;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if ( !res ) {
      throw new Error('Could not complete signup. No response received');
    }
    error.value = null;
    is_pending.value = false;
  } catch (err) {
    console.error(err);
    error.value = err.message;
    is_pending.value = false;
  }
}

function useSignUp() {
  return { error, is_pending, signUp }
}

export default useSignUp