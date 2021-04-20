import { ref } from "vue";
import { auth } from '@/firebase/config'
import { provider } from '@/firebase/config'

const error = ref(null)

const googleSignUp = async () => {
    error.value = null

    try {
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const res = await auth.signInWithPopup(provider)
        let token = await  res.credential.accessToken
        let user = res.user
        console.log(token);
        console.log(user);
    } catch (err) {
        error.value = err.message
    }
}

export default googleSignUp