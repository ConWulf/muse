<template>
  <div class="home">
    <div v-if="error">{{error}}</div>
    <div v-if="docs">
      <Playlists :playlists="docWithFormattedDate"/>
    </div>
  </div>
</template>

<script>

import getCollection from "@/composables/GetCollection"
import Playlists from "@/components/Playlists"
import {formatDistanceToNow} from 'date-fns'
import {computed} from "vue";

export default {
  name: 'Home',
  components: {
    Playlists
  },
  setup() {
    const {error, docs} = getCollection('playlists')

    // eslint-disable-next-line vue/return-in-computed-property
    const docWithFormattedDate = computed(() => {
      if (docs.value) {
        return docs.value.map(doc => {
          doc.createdAt = formatDistanceToNow(doc.createdAt.toDate() )
          return doc
        })
      }
    })
    return {error, docs, docWithFormattedDate }
  }
}
</script>
