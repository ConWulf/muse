<template>
  <div>
    <button v-if="!isOpen" @click="toggleForm">Add Songs</button>
    <form v-if="isOpen" @submit.prevent="addSong">
      <input type="text" required placeholder="title" v-model="title">
      <input type="text" required placeholder="artist" v-model="artist">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import {ref} from "vue"
import useDoc from "@/composables/UseDoc";
export default {
  name: "AddSong",
  props: ['playlist'],
  setup(props) {
    const title = ref('')
    const artist = ref('')
    const isOpen = ref(false)
    const uniqid = require('uniqid')
    const {updateDoc} = useDoc('playlists', props.playlist.id)

    const toggleForm = () => {
      isOpen.value = !isOpen.value
    }

    const addSong = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: uniqid('sng-')
      }
      await updateDoc({
        songs: [...props.playlist.songs, newSong]
      })
      title.value = ''
      artist.value = ''
    }


    return {title, artist, isOpen, toggleForm, addSong}
  }
}
</script>

<style scoped>

</style>