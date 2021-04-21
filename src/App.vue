<template>
  <Navbar/>
  <div class="h-full flex-grow">
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar
  }
}
</script>