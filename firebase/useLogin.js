import { ref } from 'vue'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const error = ref(null);
const is_pending = ref(false);

async function login(email, password) {
  error.value = null;
  is_pending.value = true;
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if ( !res ) {
      throw new Error('Could not complete login. No response received');
    }
    error.value = null;
    is_pending.value = false;
  } catch (err) {
    console.error(err);
    error.value = err.message;
    is_pending.value = false;
  }
}

function useLogin() {
  return { error, is_pending, login }
}

export default useLogin