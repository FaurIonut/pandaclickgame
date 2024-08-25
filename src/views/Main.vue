<template>
  <div class="container">
    <h1>Main</h1>
    <div class="nav_container">
      <router-link to="/about">Go to About</router-link>
    </div>
    <Prizes></Prizes>
  </div>
</template>
<script>
import Prizes from '@/components/Prizes.vue';

export default {
  name: 'Main',
  components: {Prizes},

};
</script>

<style scoped>

</style>
