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
            url.value = await resp.ref.getDownloadURL()
        } catch (err) {
            error.value = err.message
        }
    }
    const deleteImg = async (path) => {
        const storageRef = storage.ref(path)
        try {
            await storageRef.delete()
        } catch {
            error.value = "could not delete image"
        }
    }

    return {error, url, filePath, uploadImg, deleteImg}
}

export default useStorage