<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">


      <div class="CreateRezeptBox">

        <h1>Erstelle ein neues Rezept</h1>
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
              <ui-textfield v-model="beschreibung" input-type="textarea" rows="6" cols="21">
                Beschreibe hier dein Rezept.
              </ui-textfield>
            </ui-form-field>


            <!-- SUBMIT -->
            <ui-form-field v-if="name" :class="actionClass">
              <ui-button @click="postData" raised>Erstellen</ui-button>
            </ui-form-field>

            <!-- RESPONSE FAIL MESSAGE -->
            <ui-alert v-if="postResult" state="info">{{ postResult }}</ui-alert>
            <!-- RESPONSE SUCCESS MESSAGE -->
            <ui-alert v-if="postSuccessResult" state="success">Erforlgreich Registriert.</ui-alert>

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
  name: "Rezept_erstellen",
  data() {
    return {
      name: null,
      beschreibung: null,
      kategorie: ['Suppe', 'Mittagsesseen'],
      zutaten: ['Apple', 'Banana'],
      portionen: 3,
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
        formData.append('name', this.name);
        formData.append('description', this.beschreibung);
        formData.append('servings', this.portionen);
        formData.append('ingredients', this.zutaten);

        const res = await http.post("rezept/", formData, {
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