<template>
  <div class="Ueberschrift">
    <h1>Meine Rezepte</h1>
    <router-link to="/Rezepterstellen">
      <ui-button raised>
        Rezept erstellen
      </ui-button>
    </router-link>
  </div>

  <ui-image-list type="masonry" :text-protection="labelsType === 2">
    <ui-grid class="demo-grid">

      <ui-grid-cell v-for="(rezept, index) in rezepte"
                    :key="index" columns="3" class="demo-cell">

        <ui-image-item v-if="rezept.pictures.length === 0" :image="require('@/assets/Food1.jpg')"
                       @click="$router.push({name: 'RezeptDetailpage', params: {id: rezept.id, name: rezept.name,
                     description: rezept.description, servings: rezept.servings, pictures: rezept.pictures, category: rezept.category, ingredients: rezept.ingredients }})"
        ></ui-image-item>
        <ui-image-item v-else
                       :image="require('../../../../../uploads/' + rezept.pictures[0].url.replace(`uploads\\`, ``))"
                       @click="$router.push({name: 'RezeptDetailpage', params: {id: rezept.id, name: rezept.name,
                     description: rezept.description, servings: rezept.servings, pictures: rezept.pictures, category: rezept.category, ingredients: rezept.ingredients }})"
        ></ui-image-item>

        <ui-form nowrap item-margin-bottom="16" label-width="80">


          <ui-form-field>
            <h2>{{ rezept.name }}</h2>
          </ui-form-field>
          <ui-form-field>
            Portionen: {{ rezept.servings }}
          </ui-form-field>
          <ui-fab
              @click="$router.push({name: 'Rezeptbearbeiten', params: {id: rezept.id, name: rezept.name,
                     description: rezept.description, servings: rezept.servings, pictures: rezept.pictures, category: rezept.category, ingredients: rezept.ingredients }})"
              icon="edit"></ui-fab>

        </ui-form>
      </ui-grid-cell>


    </ui-grid>
  </ui-image-list>


</template>

<script>
import http from "@/http-common";

export default {
  name: "MeineRezepte",
  data() {
    return {
      labelsType: 1,
      rezepte: null,


    };
  },
  async mounted() {
    const response = await http.get("account/rezept/");
    this.rezepte = response.data.recipes;
//account/rezept/
  }
}
</script>

<style lang="scss" scoped>
$standard-gutter-size: 4px;
$masonry-gutter-size: 16px;
$icon-size: 24px;
$text-protection-background-color: rgba(0, 0, 0, 0.6);
$text-protection-height: 48px;
$text-protection-horizontal-padding: 16px;
$shape-radius: 15px;

.Ueberschrift {
  padding: 24px;
}

.ui-image-item {
  border-radius: 20px;
}
</style>