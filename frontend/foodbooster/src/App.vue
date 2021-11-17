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

  <ui-tabs v-model="active">
    <router-link to="/Home">
      <ui-tab>Home</ui-tab>
    </router-link>
    <router-link to="/Rezepte">
      <ui-tab>Tab Two</ui-tab>
    </router-link>
    <ui-tab>Tab Three</ui-tab>
  </ui-tabs>
  <p></p>
  <ui-panels v-model="active">
    <ui-panel>Panel One</ui-panel>
    <ui-panel>Panel Two</ui-panel>
    <ui-panel>Panel Three</ui-panel>
    <ui-panel>Panel Three</ui-panel>
    <ui-panel>Panel Three</ui-panel>
    <ui-panel>Panel Three</ui-panel>
    <ui-panel>Panel Three</ui-panel>
    <ui-panel>Panel Three</ui-panel>
  </ui-panels>
  <div class="test">
    <router-link to="/Home">home</router-link>
    <router-link to="/Rezept">rezept</router-link>
  </div>

  //Here the Routed Page should pe shown.
  <router-view></router-view>

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
