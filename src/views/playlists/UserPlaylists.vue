<template>
<div>

</div>
</template>

<script>
import getCollection from "@/composables/GetCollection"
import getUser from "@/composables/GetUser";

export default {
  name: "UserPlaylists",
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
