<template>

  <NavigationTabs/>

  <!-- //Here the Routed Page should pe shown. -->
  <router-view/>

</template>

<script>
import NavigationTabs from "@/components/NavigationTabs/";

export default {
  name: 'App',
  components: {
    NavigationTabs,
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
