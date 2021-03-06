import { ref } from "vue";
import { firestore } from "@/firebase/config";


const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (msg) => {
        error.value = null
        isPending.value = true
        try {
            const resp = await firestore.collection(collection).add(msg)
            isPending.value = false
            return resp
        } catch {
            error.value = 'could not post message.'
            isPending.value = false
        }
    }
    return { error, addDoc, isPending }
}

export default useCollection