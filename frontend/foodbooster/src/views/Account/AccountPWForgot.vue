<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">
      <div class="AccountRegisterBox">
        <h1>Passwort vergessen</h1>
        <ui-form nowrap item-margin-bottom="16" label-width="80">

          <!-- EMAIL -->
          <ui-form-field>
            <label class="required">E-Mail:</label>
            <ui-textfield
                v-model="vemail"
                pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                required
            >E-Mail Adresse
            </ui-textfield>
          </ui-form-field>

          <!-- Sicherheitsfrage -->
          <ui-form-field>
            <label class="required">Sicherheitsfrage</label>
            <ui-textfield v-model="vanswer" required
            >Wo bist du geboren?
            </ui-textfield
            >
          </ui-form-field>

          <!-- NEW PASSWORD -->
          <ui-form-field>
            <label class="required">New Password:</label>
            <ui-textfield
                v-model="vpassword"
                input-type="password"
                required
                pattern=".{8,}"
                :attrs="{ autocomplete: 'current-password' }"
            >
              New Password
            </ui-textfield>
          </ui-form-field>
          <!-- Change Password -->
          <ui-form-field>
            <ui-button @click="postData" raised>Passwort ändern</ui-button>
          </ui-form-field>

          <!-- RESPONSE FAIL MESSAGE -->
          <ui-alert v-if="postResult" state="info">{{ postResult }}</ui-alert>
          <!-- RESPONSE SUCCESS MESSAGE -->
          <ui-alert v-if="postSuccessResult" state="success">{{ postSuccessResult }}</ui-alert>


        </ui-form>
      </div>
    </ui-grid-cell
    >
  </ui-grid>
</template>

<script>
import http from "@/http-common";


export default {
  name: "AccountPWForgot",
  data() {
    return {
      postResult: null,
      postSuccessResult: null,

      vemail: null,
      vpassword: null,
      vanswer: null,

      contentType: "application/json",
    };
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    async postData() {
      try {
        const res = await http.put("/account/password", {
          email: this.vemail,
          sicherheitsfrageAntwort: this.vanswer,
          neuesPasswort: this.vpassword,

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


        if (result.data.success) {
          this.postSuccessResult = "Das Passwort wurde geändert.";
          this.postResult = false;
        } else {
          this.postResult = result.data.err;
          this.postSuccessResult = false;
        }
 
      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
        this.postSuccessResult = false;
      }
    },

  },


};


</script>

<style lang="scss" scoped>
</style>