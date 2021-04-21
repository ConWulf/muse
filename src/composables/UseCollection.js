import { ref } from "vue";
import { firestore } from "@/firebase/config";


const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    const addMessage = async (msg) => {
        error.value = null
        isPending.value = true
        try {
            await firestore.collection(collection).add(msg)
            isPending.value = false
        } catch {
            error.value = 'could not post message.'
            isPending.value = false
        }
    }
    return { error, addMessage, isPending }
}

export default useCollection