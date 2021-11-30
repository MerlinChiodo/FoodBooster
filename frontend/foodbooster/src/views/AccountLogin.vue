<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">


      <div class="AccountRegisterBox">

        <h1>Login</h1>
        <ui-form nowrap item-margin-bottom="16" label-width="80">
          <template #default="{ actionClass }">
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

            <!-- PASSWORD -->
            <ui-form-field>
              <label class="required">Passwort:</label>
              <ui-textfield
                  v-model="vpassword"
                  input-type="password"
                  required
                  pattern=".{8,}"
                  :attrs="{autocomplete: 'current-password'}"
              >
                Password
              </ui-textfield>
            </ui-form-field>

            <!-- Sign in -->
            <ui-form-field :class="actionClass">
              <ui-button @click="postData" raised>Einloggen</ui-button>
            </ui-form-field>

            <!-- RESPONSE FAIL MESSAGE -->
            <ui-alert v-if="postResult" state="info">{{ postResult }}</ui-alert>
            <!-- RESPONSE SUCCESS MESSAGE -->
            <ui-alert v-if="postSuccessResult" state="success">Erfolgreich eingeloggt.
              <p>
                {{ postSuccessResult }}
              </p></ui-alert>

            <!-- Register and forgot password reroutes -->
            <ui-form-field>
              <router-link to="/forgotpassword">
                Passwort vergessen?
              </router-link>
            </ui-form-field>
            <ui-form-field>
              <router-link to="/accountregister">
                Registrieren
              </router-link>
            </ui-form-field>

          </template>
        </ui-form>
      </div>
    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>


</template>
<script>
import http from "@/http-common";

export default {
  name: "AccountLogin",
  data() {
    return {
      postResult: null,
      postSuccessResult: null,
      vpassword: "",
      vemail: "",
    }
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },

    async postData() {
      try {
        const res = await http.post("account/", {
          email: this.vemail,
          password: this.vpassword,

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
      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
      }
    },

    clearPostOutput() {
      this.postResult = null;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>