<template>

  <ui-grid class="head-grid">
    <ui-grid-cell class="demo-cell" columns="12">
      <ui-form-field>
        <h1>{{name}}</h1>
      </ui-form-field>
    </ui-grid-cell>
  </ui-grid>


  <ui-grid class="bildUndListe">
    <ui-grid-cell class="bild" columns="4">
      <ui-form-field>
        <div class="bild">
          <img src="../../assets/essen_dummy.jpg" alt="Bild konnte nicht geladen werden."><!--Variable ersetzen-->
        </div>
      </ui-form-field>
    </ui-grid-cell>

    <ui-grid-cell class="liste" columns="6">
      <h2>Zutaten Liste:</h2>
      <ui-list :type="3">
        <ui-item v-for="i in 5" :key="i"><!--10 durch Variable ersetzen-->
          <ui-item-text-content>
            <ui-item-text1>Zutat</ui-item-text1> <!--Variable ersetzen-->
            <ui-item-text2>Menge</ui-item-text2> <!--Variable ersetzen-->
          </ui-item-text-content>
        </ui-item>
      </ui-list>
      <ui-slider v-model="value0" type="discrete" :step="1" withTickMarks min="1" max="10"></ui-slider>
      <!--aktuelle Position wird noch nicht angezeigt-->
    </ui-grid-cell>

    <ui-grid-cell class="leer" columns="2">
    </ui-grid-cell>
  </ui-grid>


  <ui-grid class="bewertungUndNutriUndAnleitung">
    <ui-grid-cell class="bewertung" columns="3">
      <ui-icon-button v-model="value1" :toggle="icon1"></ui-icon-button>
      <ui-icon-button v-model="value2" :toggle="icon1"></ui-icon-button>
      <ui-icon-button v-model="value3" :toggle="icon1"></ui-icon-button>
      <ui-icon-button v-model="value4" :toggle="icon1"></ui-icon-button>
      <ui-icon-button v-model="value5" :toggle="icon1"></ui-icon-button>
      <p>{{totalRatings}} Bewertungen</p>
    </ui-grid-cell>

    <ui-grid-cell class="nutri" columns="2">
      <img src="../../assets/nutri.jpg" alt="Bild konnte nicht geladen werden."><!--Variable ersetzen-->
    </ui-grid-cell>



    <ui-grid-cell class="anleitung" columns="5">
      <ui-card outlined class="demo-card">
        <div>
          Beschreibung:
        </div>
        <ui-list-divider></ui-list-divider>
        <a class="demo-card-article">
          <p class="demo-card-article__snippet">{{ description }}</p>
        </a>
        <ui-list-divider></ui-list-divider>
        <ui-card-actions full-bleed>
          <ui-button class="demo-card-action">
            Rezept bearbeiten
            <template #after>
              <ui-icon>arrow_forward</ui-icon>
            </template>
          </ui-button>
        </ui-card-actions>
      </ui-card>
    </ui-grid-cell>




    <ui-grid-cell class="leer" columns="2">
    </ui-grid-cell>
  </ui-grid>


  <ui-grid class="kommentare">
    <ui-grid-cell class="schreiben" columns="6">
      <ui-textfield input-type="textarea" rows="20" cols="120">
        Schreiben Sie einen Kommentar.
      </ui-textfield>
    </ui-grid-cell>

    <ui-grid-cell class="lesen" columns="6">
      Andere Kommentare <!--einlesen-->
    </ui-grid-cell>
  </ui-grid>


</template>


<script>
import http from "@/http-common";

export default {
  name: "rezeptDummy",


  data() {
    return {
      name: null,
      servings: null,
      description: null,
      featured: null,
      rating: null,
      totalRatings: null,
      recipeID: 7,
      recipe: null,

      value0: 1,
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      icon1: {
        on: 'star',
        off: 'star_border'
      },
    };
  },

  async mounted() {    // GET request using axios with async/await
    const response = await http.get("rezept/single/"+this.recipeID, {
        }
    );
    this.name=response.data.msg.name;
    this.servings=response.data.msg.servings;
    this.description=response.data.msg.description;
    this.rating=response.data.msg.rating;
    this.featured=response.data.msg.featured;
    this.totalRatings=response.data.msg.totalRatings;

  },


};


</script>


<style scoped>

.demo-card-article{
  color:#0000008A;
  padding: 15px;
}

.bild img {
  height: auto;
  width: 50%;
  object-fit: cover;
}


.nutri img {
  width: 50%;
}

.lesen {
  background-color: gainsboro;
}


</style>