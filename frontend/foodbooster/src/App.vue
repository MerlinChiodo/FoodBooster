<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="THE FOODBOOSTER PROJECT "/>
</template>

<script>
import HelloWorld from './components/FirstSampleFeature.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
