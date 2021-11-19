<template>
  <div class="navigationarea">
    <ui-grid class="max-width" position="left">
      <ui-grid-cell columns="2">
        <div class="logoarea">
          <img class="logo" alt="Foodboosterlogo" src="../assets/logo.png">
        </div>
      </ui-grid-cell>
      <ui-grid-cell columns="10">
        <div class="TabsBox">
          <ui-tabs v-model="active">
            <router-link to="/">
              <ui-tab>Home</ui-tab>
            </router-link>
            <router-link to="/rezepte">
              <ui-tab>Rezepte</ui-tab>
            </router-link>
            <router-link to="/featured_rezepte">
              <ui-tab>Featured_Rezepte</ui-tab>
            </router-link>
            <router-link to="/forum">
              <ui-tab>Forum</ui-tab>
            </router-link>
            <router-link to="/einkaufsliste">
              <ui-tab>Einkaufsliste</ui-tab>
            </router-link>
            <router-link to="/ernährungsplan">
              <ui-tab>Ernährungsplan</ui-tab>
            </router-link>
            <router-link to="/accountregister">
              <ui-tab>Account</ui-tab>
            </router-link>
          </ui-tabs>
        </div>
      </ui-grid-cell>
    </ui-grid>
  </div>

</template>

<script>
export default {
  name: "NavigationTabs",
}


</script>

<style lang="scss" scoped>

.navigationarea {
  background-color: #d7e0d5;
  color: inherit;
  text-decoration: none;
  text-underline: none;
  font-style: normal;

  .logoarea {
    .logo {
      //width: 200px;
      max-width: 100%;
      //height: auto;
    }
  }
}

</style>