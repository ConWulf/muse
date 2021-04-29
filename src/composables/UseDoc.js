import {ref} from "vue"
import {firestore} from "@/firebase/config"

const useDoc = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)
    let doc = firestore
        .collection(collection)
        .doc(id)

    const deleteDoc = async () => {
        error.value = null
        isPending.value = true
        try {
            const resp = await doc.delete()
            isPending.value = false
            return resp
        } catch {
            error.value = "could not delete item."
            isPending.value = false
        }
    }

    const updateDoc = async (updatedObj) => {
        error.value = null
        isPending.value = true
        try {
            const resp = await doc.update(updatedObj)
            isPending.value = false
            return resp
        } catch {
            error.value = "could not update doc."
            isPending.value = false
        }
    }


    return { error, isPending, deleteDoc, updateDoc }
}

export default useDoc