<template>
<div v-if="playlists">
  <Playlists :playlists="playlists"/>
</div>
</template>

<script>
import getCollection from "@/composables/GetCollection"
import getUser from "@/composables/GetUser"
import Playlists from "@/components/Playlists";

export default {
  name: "UserPlaylists",
  components: {
    Playlists
  },
  setup() {
    const {user} = getUser()
    const {docs: playlists} = getCollection('playlists',
        ['userId', '==', user.value.uid]
    )
    console.log(playlists);
    return {playlists}
  }
}
</script>
