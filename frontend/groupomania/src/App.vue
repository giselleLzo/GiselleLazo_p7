<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
import axios from 'axios'
export default {
  name: "App",
  created() {
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `${this.$store.state.user.token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
  
}
</style>
