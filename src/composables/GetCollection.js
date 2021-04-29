import {ref, watchEffect} from "vue"
import {firestore} from "@/firebase/config"

const getCollection = (collection, query) => {
    const docs = ref(null)
    const error = ref(null)

    let  collectionRef = firestore
        .collection(collection)
        .orderBy('createdAt')

    if (query) {
        collectionRef = collectionRef.where(...query)
    }


    const col = collectionRef.onSnapshot( snapshot => {
        let docBucket = []
        snapshot.docs.forEach(doc => {
            doc.data().createdAt && docBucket.push({...doc.data(), id: doc.id})
        })
        docs.value = docBucket
        error.value = null
    }, (err) => {
        console.log(err.message);
        error.value = 'could not get messages'
        docs.value = null
    })

    watchEffect(onInvalidate => {
        onInvalidate(() => col())
    })

    return { error, docs }
}

export default getCollection