<template>

  <h1>Rezepte</h1>
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

        <ui-icon :size="18" v-if="rezept.rating >= 1">star_rate</ui-icon>
        <ui-icon :size="18" v-if="rezept.rating >= 2">star_rate</ui-icon>
        <ui-icon :size="18" v-if="rezept.rating >= 3">star_rate</ui-icon>
        <ui-icon :size="18" v-if="rezept.rating >= 4">star_rate</ui-icon>
        <ui-icon :size="18" v-if="rezept.rating >= 5">star_rate</ui-icon>


        <ui-image-text v-if="labelsType">
          <h2>{{ rezept.name }} </h2> Portionen: {{ rezept.servings }}
        </ui-image-text>
      </ui-grid-cell>

    </ui-grid>
  </ui-image-list>
</template>

<script>
import http from "@/http-common";

export default {
  name: "FeaturedRezepte",
  data() {
    return {
      labelsType: 1,
      zutaten: null,
      rezepte: null,
      rezeptURL: null,
      url: null,
      rating: null,

    };
  },
  async mounted() {    // GET request using axios with async/await

    const response = await http.get("rezept/featured/");
    this.rezepte = response.data.featured;

  },
};
</script>

<style lang="scss" scoped>
h1 {
  padding: 24px;

}

$standard-gutter-size: 4px;
$masonry-gutter-size: 16px;
$icon-size: 24px;
$text-protection-background-color: rgba(0, 0, 0, 0.6);
$text-protection-height: 48px;
$text-protection-horizontal-padding: 16px;
$shape-radius: 15px;

.ui-image-item {
  border-radius: 20px;
}

.mdc-image-list__image-aspect-container {
  padding-bottom: 75%;
}

</style>
