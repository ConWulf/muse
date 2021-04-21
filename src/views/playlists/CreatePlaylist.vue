<template>
  <form @submit.prevent="submitPlaylist">
    <input type="text" v-model="title" required placeholder="Title">
    <textarea required placeholder="Description" v-model="description"></textarea>
    <input type="file" @change="fileListener">
    <div v-if="fileError">{{fileError}}</div>
    <button>Create Playlist</button>
  </form>
</template>

<script>
import {ref} from "vue";

export default {
  name: "CreatePlaylist",
  setup() {
    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)

    const submitPlaylist = () => {
      if (file.value) {
        console.log('submit')
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
    return {title, description, submitPlaylist, fileListener, fileError}
  }
}
</script>
