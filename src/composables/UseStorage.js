import { storage } from '@/firebase/config'
import {ref} from "vue";
import getUser from "@/composables/GetUser";

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)
    const {user} = getUser()
    const uploadImg = async file => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = storage.ref(filePath.value)
        try {
            const resp = await storageRef.put(file)
            url.value = resp.ref.getDownloadURL()
        } catch (err) {
            error.value = err.message
        }
    }

    return {error, url, filePath, uploadImg}
}

export default useStorage