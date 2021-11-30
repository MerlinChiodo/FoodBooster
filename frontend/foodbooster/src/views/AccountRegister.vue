<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">


      <div class="AccountRegisterBox">

        <h1>Registrieren</h1>
        <ui-form nowrap item-margin-bottom="16" label-width="80">
          <template #default="{ actionClass }">

            <!-- USERNAME -->
            <ui-form-field>
              <label class="required" pattern=".{,20}">Nutzername:</label>
              <ui-textfield type="text" ref="username" required>Nutzername</ui-textfield>
            </ui-form-field>

            <!-- EMAIL -->
            <ui-form-field>
              <label class="required">E-Mail:</label>
              <ui-textfield type="text" ref="email" pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+" required>E-Mail
                Adresse
              </ui-textfield>
            </ui-form-field>

            <!-- Sicherheitsfrage -->
            <ui-form-field>
              <label class="required">Sicherheitsfrage</label>
              <ui-textfield type="text" ref="answer" required>Wo bist du geboren?</ui-textfield>
            </ui-form-field>

            <!-- PASSWORD -->
            <ui-form-field>
              <label class="required">Passwort:</label>
              <ui-textfield
                  ref="password"
                  input-type="password"
                  required
                  pattern=".{8,}"
                  helper-text-id="pw-validation-msg"
                  :attrs="{autocomplete: 'current-password'}"
              >
                Passwort auswählen
              </ui-textfield>
              <ui-textfield-helper id="pw-validation-msg" visible validMsg>
                Sollte mindestens 8 Zeichen lang sein.
              </ui-textfield-helper>
            </ui-form-field>

            <!-- NEWSLETTER -->
            <ui-form-field>
              <ui-checkbox helper-text-id="newsletter-validation-msg"></ui-checkbox>
              <ui-textfield-helper id="newsletter-validation-msg" visible validMsg>
                Ja, ich will den Newsletter abonieren.
              </ui-textfield-helper>
            </ui-form-field>

            <!-- SUBMIT -->
            <ui-form-field :class="actionClass">
              <ui-button @click="postData" raised>Registrieren</ui-button>
            </ui-form-field>

            <!-- RESPONSE MESSAGE -->
            <ui-alert v-if="postResult" state="info">{{ postResult }}</ui-alert>

          </template>
        </ui-form>
      </div>
    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>


</template>

<script>
import http from "../http-common.js";

export default {
  name: "AccountRegister",
  data() {
    return {
      postResult: null
    }
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },

    async postData() {
      try {
        const res = await http.post("/account", {
          email: this.$refs.email.value,
          username: this.$refs.username.value,
          password: this.$refs.password.value,
          answer: this.$refs.answer.value,

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

        this.postResult = this.fortmatResponse(result);
        this.clearPostOutput();
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