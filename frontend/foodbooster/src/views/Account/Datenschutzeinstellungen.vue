<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">
      <h1>Datenschutzeinstellungen</h1>
      <h3>Hier kannst du deine Infos für andere Nutzer sichtbar machen.</h3>
      <ui-form-field v-if="!activatedDetailinfos">
        <ui-button @click="activateDetailinfos" raised>Aktivieren</ui-button>
      </ui-form-field>

      <ui-form-field>
        <ui-button @click="deactivateDetailinfos" raised>Deaktivieren</ui-button>
      </ui-form-field>


      <!-- RESPONSE FAIL MESSAGE -->
      <ui-alert v-if="postResult" state="info">Leider nein.</ui-alert>
      <!-- RESPONSE SUCCESS MESSAGE -->
      <ui-alert v-if="postSuccessResult" state="success">Super! Das hat geklappt.
      </ui-alert>

    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>
</template>

<script>
import {useCookies} from "vue3-cookies";
import http from "@/http-common";

export default {
  name: "Datenschutzeinstellungen",
  setup() {
    const {cookies} = useCookies();
    return {cookies};
  },

  data() {
    return {
      postResult: null,
      postSuccessResult: null,
      activatedDetailinfos: null,
      benutzer_email: "test1@test.de"
      // this.cookies.get("LoggedInCookie"),
    }
  },
  methods: {

    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },

    async activateDetailinfos() {
      try {
        const res = await http.post("detailinfos/", {
          benutzer_email: this.benutzer_email,


        }, {
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
        // if (res.data === "Home") {
        this.cookies.set("DetailinfosActivatedCookie", "true");
        this.activatedDetailinfos = true;
        console.log("Die Detailinfos sind ", this.activatedDetailinfos);


        // }


      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
      }
    },

    async deactivateDetailinfos() {
      try {
        const res = await http.delete("detailinfos/", {
              headers: {
                "x-access-token": "token-value",
                data: {
                  benutzer_email: this.benutzer_email,
                }
              },
            })
        ;

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.postSuccessResult = this.fortmatResponse(result);

        this.cookies.remove("DetailinfosActivatedCookie");
        this.successfullLoginEmail = false;

      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
        // try {
        this.cookies.remove("DetailinfosActivatedCookie");
        this.successfullLoginEmail = false;
        // } catch (err) {
        //   console.log("Cookie was not Removed" || err)
        // }

      }
    },


  }


}
</script>

<style lang="scss" scoped>

</style>