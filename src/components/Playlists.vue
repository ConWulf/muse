<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{name: 'Details', params: {id: playlist.id}}">
      <div class="flex mx-2 my-4  p-4 text-lg items-center bg-purple-600 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-101">
        <div class="w-32 relative ">
  <!--        <span class="text-sm absolute bottom-0">{{playlist.createdAt}}</span>-->
          <img :src="playlist.url" alt="" class="w-full circleImg">
        </div>
        <div>
          <span>{{playlist.title}}</span>
          <span class="block">By {{playlist.username}}</span>
        </div>
  <!--      <p>{{playlist.description}}</p>-->
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Playlists",
  props: ['playlists']
}
</script>
