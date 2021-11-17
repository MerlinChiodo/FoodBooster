<template>
  <div class="navigationarea">
    <ui-grid class="max-width" position="left">
      <ui-grid-cell columns="2">
        <div class="logoarea">
          <img class="logo" alt="Foodboosterlogo" src="./assets/logo.png">
        </div>
      </ui-grid-cell>
      <ui-grid-cell columns="10">
        <NavigationTabs/>
      </ui-grid-cell>
    </ui-grid>
  </div>
</template>

<script>
import NavigationTabs from "@/components/NavigationTabs";

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

.navigationarea {
  background-color: #d7e0d5;

  .logoarea {
    .logo {
      //width: 200px;
      max-width: 100%;
      //height: auto;
    }
  }
}
</style>
