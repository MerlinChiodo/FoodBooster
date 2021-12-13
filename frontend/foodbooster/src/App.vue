<template>

  <NavigationTabs/>

  <!-- //Here the Routed Page should pe shown. -->
  <router-view/>

  <BottomNavigation/>

</template>

<script>
import NavigationTabs from "@/components/NavigationTabs/";
import BottomNavigation from "@/components/BottomNavigation";

export default {
  name: 'App',
  components: {
    NavigationTabs,
    BottomNavigation,
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
