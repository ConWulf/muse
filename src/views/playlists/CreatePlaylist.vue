<template>
  <form @submit.prevent="submitPlaylist">
    <input type="text" v-model="title" required placeholder="Title">
    <textarea required placeholder="Description" v-model="description"></textarea>
    <input type="file" @change="fileListener">
    <div v-if="fileError">{{fileError}}</div>
    <button v-if="!isPending">Create Playlist</button>
    <button v-else disabled>Creating Playlist...</button>
  </form>
</template>

<script>
import {ref} from "vue"
import useStorage from "@/composables/UseStorage"
import useCollection from "@/composables/UseCollection"
import getUser from "@/composables/GetUser"
import {timeStamp} from "@/firebase/config"
import {useRouter} from "vue-router";

export default {
  name: "CreatePlaylist",
  setup() {
    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)
    const router = useRouter()

    const { url, filePath, uploadImg} = useStorage()
    const { addDoc, error } = useCollection('playlists')
    const { user } = getUser()

    const submitPlaylist = async () => {
      if (file.value) {
        isPending.value = true
        await uploadImg(file.value)
        const resp = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          username: user.value.displayName,
          url: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timeStamp()
        })
        isPending.value = false
        if(!error.value) {
          await router.push({name: 'Details', params: {id: resp.id}})
        }
      }
    }

    const types = ['image/png', 'image/jpeg']

    const fileListener = (e) => {
      const selected = e.target.files[0];
      if(selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      }
      else {
        file.value = null
        fileError.value = 'please select a png or jpg file'
      }
    }
    return {title, description, submitPlaylist, fileListener, fileError, isPending}
  }
}
</script>
