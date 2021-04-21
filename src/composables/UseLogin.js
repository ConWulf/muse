import { ref } from "vue";
import { auth } from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true
    try {
        const resp = await auth.signInWithEmailAndPassword(email, password)
        error.value = null
        isPending.value = false
        return resp
    } catch (err) {
        error.value = err.message
        isPending.value = false
    }
}

const useLogin = () => ({ error, login, isPending })

export default useLogin