<template>

  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">


      <div class="CreateRezeptBox">

        <h1>Hier kannst du dein Rezept {{ this.$route.params.name }} bearbeiten</h1>
        <h3>Dein Rezept hat die ID: {{ this.$route.params.id }}.</h3>

        <ui-form nowrap item-margin-bottom="16" label-width="80">
          <template #default="{ actionClass }">

            <!-- Rezeptname -->
            <ui-form-field>
              <label class="required"> Name: </label>
              <ui-textfield v-model="name" required>
                Rezeptname
              </ui-textfield>
            </ui-form-field>


            <!-- BESCHREIBUNG -->
            <ui-form-field>
              <label class="actionClass"> Beschreibung</label>
              <ui-textfield v-model="description" input-type="textarea" rows="6" cols="21" required>
                Beschreibe hier dein Rezept
              </ui-textfield>
            </ui-form-field>


            <ui-form-field>
              <a>Bitte wähle aus wie viele Portionen dein Rezept hat: {{ servings }}</a>
            </ui-form-field>

            <ui-slider
                v-model="servings"
                type="discrete"
                :step="1"
                min="1"
                max="15"
                with-tick-marks
            >
            </ui-slider>


            <!-- SUBMIT -->
            <ui-form-field v-if="name" :class="actionClass">
              <ui-button @click="postData" raised>Rezept aktualisieren</ui-button>
            </ui-form-field>

            <!-- RESPONSE FAIL MESSAGE -->
            <ui-alert v-if="postResult" state="info">{{ postResult }}</ui-alert>
            <!-- RESPONSE SUCCESS MESSAGE -->
            <ui-alert v-if="postSuccessResult" state="success">Rezept erfolgreich aktualisiert.</ui-alert>

          </template>
        </ui-form>
      </div>
    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>

</template>

<script>
import http from "@/http-common";

const FormData = require('form-data');


export default {
  name: "Rezeptbearbeiten",
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.name,
      description: this.$route.params.description,
      kategorie: ['Suppe', 'Mittagsesseen'],
      ingredients: ['Apple', 'Banana'],
      servings: this.$route.params.servings,
      postSuccessResult: null,
      postResult: null,

    }
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },

    async postData() {
      try {
        const formData = new FormData();
        formData.append('rezeptID', this.id);
        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('servings', this.servings);
        formData.append('ingredients', this.ingredients);

        const res = await http.put("rezept/", formData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

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

  }


}

</script>

<style scoped>

</style>