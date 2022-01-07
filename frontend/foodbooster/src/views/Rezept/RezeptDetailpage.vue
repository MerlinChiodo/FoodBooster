<template>

  <ui-grid class="head-grid">
    <ui-grid-cell class="demo-cell" columns="12">
      <ui-form-field>
        <h1>{{ name }}</h1>
      </ui-form-field>
    </ui-grid-cell>
  </ui-grid>


  <ui-grid class="bildUndListe">
    <ui-grid-cell class="bild" columns="4">
      <ui-form-field>
        <!--        <div class="bild">-->
        <ui-image-list type="masonry">
          <ui-image-item v-if="this.pictures.length === 0" :image="require('@/assets/Food1.jpg')"
          ></ui-image-item>
          <ui-image-item v-else
                         :image="require('../../../../../uploads/' + this.pictures[0].url.replace(`uploads\\`, ``))"
          ></ui-image-item>
        </ui-image-list>
        <!--        </div>-->
      </ui-form-field>
    </ui-grid-cell>

    <ui-grid-cell class="liste" columns="6">


      <h2>Zutaten:</h2>
      <ui-list :type="3">
        <ui-item v-for="i in this.ingredients" :key="i">
          <ui-item-text-content>{{ i.ingredientName }} {{ (i.amount * this.multiplikator) }} mg/ml/stk
          </ui-item-text-content>
        </ui-item>
      </ui-list>
      <h4>Dieses {{ name }} ist für {{ this.servings }} Portionen.</h4>
      <h4>Wie oft wollen Sie das {{ name }} anfertigen: {{ this.multiplikator }} mal.</h4>
      <ui-slider v-model="multiplikator" type="discrete" :step="1" withTickMarks min="1" max="10"></ui-slider>
      <h4>Sie möchten also {{ (this.servings * this.multiplikator) }} Portionen kochen.</h4>


      <h4>Kategorien: </h4>
      <ui-list :type="3">
        <ui-item v-for="i in this.category" :key="i">
          <ui-item-text-content>{{ i.categoryName }}</ui-item-text-content>
        </ui-item>
      </ui-list>


      <ui-icon-button v-if="checkFavourite(Animal.HAUSTIERID)"
                      @click="unfavouriteAnimal(Animal.HAUSTIERID)"
                      icon="bookmark"></ui-icon-button>
      <ui-icon-button v-else
                      @click="favouriteAnimal(Animal.HAUSTIERID)"
                      icon="bookmark_border"></ui-icon-button>


    </ui-grid-cell>

    <ui-grid-cell class="leer" columns="2">
    </ui-grid-cell>
  </ui-grid>


  <ui-grid class="bewertungUndNutri">
    <ui-grid-cell class="bewertung" columns="3">

      <ui-icon :size="48" v-if="rating >= 1">star_rate</ui-icon>
      <ui-icon :size="48" v-if="rating >= 2">star_rate</ui-icon>
      <ui-icon :size="48" v-if="rating >= 3">star_rate</ui-icon>
      <ui-icon :size="48" v-if="rating >= 4">star_rate</ui-icon>
      <ui-icon :size="48" v-if="rating >= 5">star_rate</ui-icon>


      <!--      Vor dem bewerten-->
      <p v-if="!userRating">Du kannst dieses Rezept gerne bewerten.</p>

      <div v-if="!userRating">
        <ui-icon-button :size="48" @click="doRating(1)">star_rate</ui-icon-button>
        <ui-icon-button :size="48" @click="doRating(2)">star_rate</ui-icon-button>
        <ui-icon-button :size="48" @click="doRating(3)">star_rate</ui-icon-button>
        <ui-icon-button :size="48" @click="doRating(4)">star_rate</ui-icon-button>
        <ui-icon-button :size="48" @click="doRating(5)">star_rate</ui-icon-button>
      </div>
      <!--      Sterne nach dem bewerten-->

      <div v-else-if="userRating">
        <p>Du hast dieses Rezept mit {{ userRating }} Sternen bewertet.</p>
        <ui-icon-button :size="48" v-if="userRating >= 1">star_rate</ui-icon-button>
        <ui-icon-button :size="48" v-if="userRating >= 2">star_rate</ui-icon-button>
        <ui-icon-button :size="48" v-if="userRating >= 3">star_rate</ui-icon-button>
        <ui-icon-button :size="48" v-if="userRating >= 4">star_rate</ui-icon-button>
        <ui-icon-button :size="48" v-if="userRating >= 5">star_rate</ui-icon-button>
      </div>


      <p>Insgesammt {{ totalRatings }} Bewertungen</p>
    </ui-grid-cell>

    <ui-grid-cell class="nutri" columns="3">
      <img src="../../assets/nutri.jpg" alt="Bild konnte nicht geladen werden."><!--Variable ersetzen-->
    </ui-grid-cell>

    <ui-grid-cell class="leer" columns="6">
    </ui-grid-cell>
  </ui-grid>


  <ui-grid class="description">
    <ui-grid-cell class="anleitung" columns="6">
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

    <ui-grid-cell class="leer" columns="6">
    </ui-grid-cell>
  </ui-grid>


  <ui-grid class="kommentare">
    <ui-grid-cell class="schreiben" columns="3">
      <ui-textfield v-model="kommentar" input-type="textarea" rows="20" cols="120">
        Schreiben Sie einen Kommentar.
      </ui-textfield>
      <ui-card-actions full-bleed>
        <ui-button class="demo-card-action" @click="kommentarSchreiben">
          Kommentieren
          <template #after>
            <ui-icon>arrow_forward</ui-icon>
          </template>
        </ui-button>
      </ui-card-actions>
    </ui-grid-cell>

    <ui-grid-cell class="lesen" columns="9">
      Andere Kommentare <!--einlesen-->
    </ui-grid-cell>

    <ui-grid-cell class="leer" columns="0">
    </ui-grid-cell>
  </ui-grid>


</template>


<script>
import http from "@/http-common";

export default {
  name: "RezeptDetailpage",


  data() {
    return {
      name: null,
      servings: null,
      description: null,
      featured: null,
      rating: null,
      userRating: null,
      totalRatings: 0,
      recipeID: this.$route.params.id,
      recipe: null,
      bewertung: null,
      kommentar: "",
      schalter: false,
      pictures: [],
      category: null,
      ingredients: null,
      amounts: null,
      multiplikator: 1,


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
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    async doRating(rating) {
      this.userRating = rating;
      this.totalRatings++;

      try {
        const result = await http.post("/rezept/bewertung/", {
              recipeID: this.recipeID,
              rating: this.userRating,
            },
            {
              headers: {
                "x-access-token":
                    "token-value",
              }
            }
        );
        const res = {
          status: result.status + "-" + result.statusText,
          headers: result.headers,
          data: result.data,
        };

        this.postSuccessResult = this.fortmatResponse(res);

      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
      }

    },
  },
  async mounted() {    // GET request using axios with async/await
    const response = await http.get("rezept/single/" + this.recipeID, {}
    );
    this.name = response.data.msg.name;
    this.servings = response.data.msg.servings;
    this.description = response.data.msg.description;
    this.pictures = response.data.msg.pictures;
    this.ingredients = response.data.msg.ingredients;
    this.amounts = response.data.msg.amounts;
    this.category = response.data.msg.category;
    this.rating = response.data.msg.rating;
    this.featured = response.data.msg.featured;
    this.totalRatings = response.data.msg.totalRatings;
  },
  fortmatResponse(res) {
    return JSON.stringify(res, null, 2);
  },

  async postKommentar() {
    try {
      const res = await http.post("/api/rezept/kommentar/", {
                recipeID: this.recipeID,
                kommentarID: 0, //ID sollte aus dem Backend kommen
                kommentar: this.kommentar,

              }
              ,
              {
                headers: {
                  "x-access-token":
                      "token-value",
                }
                ,
              }
          )
      ;

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      this.postSuccessResult = this.fortmatResponse(result);
    } catch (err) {
      this.postResult = this.fortmatResponse(err.response?.data) || err;
    }
  },


};


</script>


<style scoped>

.demo-card-article {
  color: #0000008A;
  padding: 15px;
}

/*.bild img {*/
/*  height: auto;*/
/*  width: 50%;*/
/*  object-fit: cover;*/
/*}*/


.nutri img {
  width: 50%;
}

.lesen {
  background-color: gainsboro;
}


</style>