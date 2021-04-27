<template>
  <div>
    <div v-if="error">{{error}}</div>
    <div v-if="playlist">
<!--playlist info-->
      <div>
        <div class="w-72">
          <img :src="playlist.url" alt="cover image">
        </div>
        <div>{{ playlist.title }}</div>
        <p>by {{playlist.username}}</p>
        <p>{{playlist.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import getDoc from "@/composables/GetDoc";
export default {
  name: "Details",
  props: ['id'],
  setup(props) {
    const {error, doc: playlist} = getDoc('playlists', props.id)

    return {error, playlist}
  }
}
</script>

<style scoped>

</style>