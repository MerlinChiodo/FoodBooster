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


  <ui-grid class="bewertungUndNutri">
    <ui-grid-cell class="bewertung" columns="3">
      <div class="bild">
        <img src="../../assets/sterne.jpg" alt="Bild konnte nicht geladen werden."><!--Variable ersetzen-->
      </div>
      <ui-form-field>
        <ui-radio :disabled="schalter" v-model="bewertung" @click="ausgrauen" input-id="eins"
                  value="1" v-on:change="aufrufen"></ui-radio>
        <label>1</label>
      </ui-form-field>
      <ui-form-field>
        <ui-radio :disabled="schalter" v-model="bewertung" @click="ausgrauen" input-id="zwei"
                  value="2" v-on:change="aufrufen"></ui-radio>
        <label>2</label>
      </ui-form-field>
      <ui-form-field>
        <ui-radio :disabled="schalter" v-model="bewertung" @click="ausgrauen" input-id="drei"
                  value="3" v-on:change="aufrufen"></ui-radio>
        <label>3</label>
      </ui-form-field>
      <ui-form-field>
        <ui-radio :disabled="schalter" v-model="bewertung" @click="ausgrauen" input-id="vier"
                  value="4" v-on:change="aufrufen"></ui-radio>
        <label>4</label>
      </ui-form-field>
      <ui-form-field>
        <ui-radio :disabled="schalter" v-model="bewertung" @click="ausgrauen" input-id="fuenf"
                  value="5" v-on:change="aufrufen"></ui-radio>
        <label>5</label>
      </ui-form-field>

      <p>{{ totalRatings }} Bewertungen</p>
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
      totalRatings: 0,
      recipeID: this.$route.params.id,
      recipe: null,
      bewertung: null,
      kommentar: "",
      schalter: false,


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
    aufrufen() {
      this.userBewertung();
      this.bewertungszaehler();
    },


    bewertungszaehler() {
      this.totalRatings++
    },
    userBewertung() {
      this.rating = this.bewertung.value;
    },
    ausgrauen() {
      this.schalter = true;
    }
  },

  async mounted() {    // GET request using axios with async/await
    const response = await http.get("rezept/single/" + this.recipeID, {}
    );
    this.name = response.data.msg.name;
    this.servings = response.data.msg.servings;
    this.description = response.data.msg.description;
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