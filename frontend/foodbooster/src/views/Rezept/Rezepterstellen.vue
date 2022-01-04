<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">


      <div class="CreateRezeptBox">

        <ui-form nowrap item-margin-bottom="16" label-width="80">
          <h1>Erstelle ein neues Rezept</h1>
          <ui-form nowrap item-margin-bottom="16" label-width="80">
            <template #default="{ actionClass }">
              <div v-if="!hochgeladen">
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
                    Beschreibe dein Rezept
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
                <!-- ICONS UNTER BILDER FALLS NOCH NÖTIG, Favorisieren usw. -->
                <!--              <ui-list role="group">-->
                <!--                <template v-for="(item, index) in items">-->
                <!--                  <ui-item-divider v-if="item === '-'" :key="index"></ui-item-divider>-->
                <!--                  <ui-item v-else :key="index">-->
                <!--                    <ui-item-text-content>{{ item.text }}</ui-item-text-content>-->
                <!--                    <ui-item-last-content>-->
                <!--                      <ui-checkbox-->
                <!--                          v-model="checkedValues"-->
                <!--                          :value="item.value"-->
                <!--                          @click.stop-->
                <!--                      ></ui-checkbox>-->
                <!--                    </ui-item-last-content>-->
                <!--                  </ui-item>-->
                <!--                </template>-->
                <!--              </ui-list>-->


                <!-- PICTURE UPLOAD -->

                <label>Bitte lade hier dein Bild hoch: </label>
                <ui-form-field>
                  <input type="file" @change="handleFileUpload( $event )"/>
                </ui-form-field>


                <!-- SUBMIT -->
                <ui-form-field v-if="name" :class="actionClass">
                  <ui-button @click="postData" raised>Hochladen</ui-button>
                </ui-form-field>

              </div>
              <!-- RESPONSE FAIL MESSAGE -->
              <ui-alert v-if="postResult" state="info">{{ postResult }}</ui-alert>
              <!-- RESPONSE SUCCESS MESSAGE -->
              <ui-alert v-if="postSuccessResult" state="success">Das Rezept wurde erfolgreich hochgeladen.</ui-alert>

            </template>
          </ui-form>
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
  mounted() {

  },
  data() {
    return {

      name: null,
      description: null,
      kategorie: ['Suppe', 'Mittagsesseen'],
      ingredients: ['TEST_Zucker', 'TEST_Weissbrot'],
      servings: 1,
      postSuccessResult: null,
      postResult: null,
      hochgeladen: false,
      file: null,

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
        formData.append('description', this.description);
        formData.append('servings', this.servings);
        formData.append('ingredients', this.ingredients);
        formData.append('productImage', this.file);

        const res = await http.post("rezept/", formData, {
          headers: {
            "x-access-token": "token-value",
            'Content-Type': 'multipart/form-data',
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.postSuccessResult = this.fortmatResponse(result);
        this.hochgeladen = true;
      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
        this.hochgeladen = false;
      }
    },

    handleFileUpload(event) {

      console.log(event);
      console.log(event.target.files);

      this.file = event.target.files[0];
      console.log(this.file);
    },

  }

}
</script>

<style scoped>

</style>