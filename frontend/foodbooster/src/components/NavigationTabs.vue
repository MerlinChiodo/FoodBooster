<template>
  <div class="navigationarea">
    <ui-grid class="max-width" position="left">
      <ui-grid-cell columns="2">
        <div class="logoarea">
          <img class="logo" alt="Foodboosterlogo" src="../assets/Logo-01.png">
        </div>
      </ui-grid-cell>
      <ui-grid-cell columns="10">
        <div class="TabsBox">
          <ui-tabs>
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
            <router-link to="/FavoritRezepte">
              <ui-tab>Favoriten</ui-tab>
            </router-link>
            <router-link to="/MeineRezepte">
              <ui-tab>Meine Rezepte</ui-tab>
            </router-link>
            <router-link to="/accountlogin">
              <ui-tab>Account</ui-tab>
            </router-link>
          </ui-tabs>
        </div>
      </ui-grid-cell>
    </ui-grid>
  </div>

</template>

<script>
import {useCookies} from "vue3-cookies";

export default {
  name: "NavigationTabs",

  setup() {
    const {cookies} = useCookies();
    return {cookies};
  },
  data() {
    return {
      successfullLoginEmail: null,
    }
  },
  mounted() {
    try {
      this.successfullLoginEmail = this.cookies.get("LoggedInCookie");
    } catch (err) {
      console.log(err)
    }
  }
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
      max-width: 55%;
      //height: auto;
    }
  }
}

</style>