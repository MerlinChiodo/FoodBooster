<template>
  <div class="navigationarea">
    <ui-grid class="max-width" position="left">


      <ui-grid-cell columns="12">
        <div class="TabsBox">
          <ui-tabs align="center">
            <router-link to="/Datenschutzerklaerung">
              <ui-tab>Datenschutzerklärung</ui-tab>
            </router-link>
            <router-link to="/Impressum">
              <ui-tab>Impressum</ui-tab>
            </router-link>
          </ui-tabs>
        </div>
      </ui-grid-cell>


    </ui-grid>
  </div>
</template>

<script>
export default {
  name: "BottomNavigation",
  components: {}

}
</script>

<style lang="scss" scoped>

.navigationarea {
  background-color: #d7e0d5;
  color: inherit;
  text-decoration: none;
  text-underline: none;
  font-style: normal;
  bottom: 10px;
  margin: auto;
  width: 100%;

  .TabsBox {
    text-align: center;
    padding: 10px;
    margin: auto;
  }

  .logoarea {
    .logo {
      //width: 200px;
      max-width: 70%;
      padding: 10px;
      //height: auto;
    }
  }
}

</style>