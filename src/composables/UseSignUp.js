import { ref } from "vue";
import { auth } from '@/firebase/config'

const error = ref(null)

const signUp = async (email, displayName, password) => {
    error.value = null

    try {
        const resp = await auth.createUserWithEmailAndPassword(email, password)
        if(!resp) {
            throw new Error("there was a problem with signing up.")
        }
        await resp.user.updateProfile({ displayName })
        error.value = null

        return resp
    } catch (err) {
        error.value = err.message
    }
}

const useSignUp = () => {return {error, signUp}}

export default useSignUp