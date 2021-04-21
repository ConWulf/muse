import { ref } from "vue";
import { auth } from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)

const signUp = async (email, displayName, password) => {
    error.value = null
    isPending.value = true

    try {
        const resp = await auth.createUserWithEmailAndPassword(email, password)
        await resp.user.updateProfile({ displayName })
        error.value = null
        isPending.value = false

        return resp
    } catch (err) {
        error.value = err.message
        isPending.value = false
    }
}

const useSignUp = () => ({error, signUp, isPending})

export default useSignUp