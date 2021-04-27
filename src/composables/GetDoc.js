import {ref, watchEffect} from "vue"
import {firestore} from "@/firebase/config"

const getDoc = (collection, id) => {
    const doc = ref(null)
    const error = ref(null)

    let  docRef = firestore
        .collection(collection)
        .doc(id)

    const unsub = docRef.onSnapshot( snapDoc => {
        console.log(doc);
        if (snapDoc.data()) {
            doc.value = {...snapDoc.data(), id: snapDoc.id}
            error.value = null
        } else {
            error.value = 'document does not exist'
        }
    }, () => {
        error.value = 'could not get messages'
        doc.value = null
    })

    watchEffect(onInvalidate => {
        onInvalidate(() => unsub())
    })

    return { error, doc }
}

export default getDoc