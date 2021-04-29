<template>
  <div class="grid grid-cols-3 gap-x-16 justify-between px-4 mt-20">
    <div v-if="error">{{error}}</div>
    <div v-if="playlist" class="col-span-full sm:col-span-1">
<!--playlist info-->
      <div class="text-center">
        <div class="max-w-md relative overflow-hidden p-32 rounded-md">
          <img :src="playlist.url" alt="cover image" class=" min-w-full min-h-full absolute inset-0">
        </div>
        <h2 class="text-xl font-bold text-gray-700">{{ playlist.title }}</h2>
        <p class="text-sm">by {{playlist.username}}</p>
        <p class="text-sm text-left">{{playlist.description }}</p>
        <button v-if="owner" @click="removePlaylist">Delete</button>
      </div>
    </div>
    <div v-if="playlist" class="sm:col-span-2 col-span-full">
      <div v-if="!playlist.songs.length">No Songs Added Yet</div>
      <div v-else>
        <div v-for="song in playlist.songs" :key="song.id" class="flex p-3 justify-start space-x-8 items-center">
          <div class="text-sm">
            <h3>{{song.title}}</h3>
            <h4>{{song.artist}}</h4>
          </div>
          <button @click="removeSong(song.id)" v-if="owner" class="px-2 py-1">Delete</button>
        </div>
      </div>
      <AddSong v-if="owner" :playlist="playlist"/>
    </div>
  </div>
</template>

<script>
import getDoc from "@/composables/GetDoc"
import getUser from "@/composables/GetUser"
import useDoc from "@/composables/UseDoc"
import useStorage from "@/composables/UseStorage";
import {computed} from "vue"
import {useRouter} from "vue-router"
import AddSong from "@/components/AddSong";
export default {
  name: "Details",
  components: {AddSong},
  props: ['id'],
  setup(props) {
    const {error, doc: playlist} = getDoc('playlists', props.id)
    const { user } = getUser()
    const {error: e, isPending, deleteDoc, updateDoc} = useDoc('playlists', props.id)
    const {deleteImg} = useStorage()
    const router = useRouter()

    const owner = computed(() => {
      return playlist.value && user.value && user.value.uid === playlist.value.userId
    })

    const removePlaylist = async () => {
      await deleteImg(playlist.value.filePath)
      await deleteDoc()
      await router.push({name: 'Home'})
    }

    const removeSong = async (id) => {
      const songs = playlist.value.songs.filter(song => song.id !== id)
      await updateDoc({
        songs
      })
    }

    return {error, playlist, owner, removePlaylist, e, isPending, removeSong}
  }
}
</script>
