<template>
  <div id="app" class="container">
    <router-view></router-view>
      <GameTapper></GameTapper>
    </div>
</template>

<script>
import GameTapper from './components/GameTapper.vue';

export default {
  components: {GameTapper}
};
</script>

<style scoped>
/* .container{
  width: 100%;
  height: auto;
  margin: 0px;
  padding: 0px;
} */
</style>




