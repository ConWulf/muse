import { ref } from "vue";
import { firestore } from "@/firebase/config";


const useCollection = (collection) => {
    const error = ref(null)

    const addMessage = async (msg) => {
        error.value = null
        try {
            await firestore.collection(collection).add(msg)
        } catch {
            error.value = 'could not post message.'
        }
    }
    return { error, addMessage }
}

export default useCollection