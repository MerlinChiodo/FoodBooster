<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">

      <div class="AccountRegisterBox">

        <ui-form nowrap item-margin-bottom="16" label-width="80">

          <div v-if="!successfullLoginEmail">

            <h1>Login</h1>

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
            <ui-form-field>
              <ui-button @click="postData" raised>Einloggen</ui-button>
            </ui-form-field>
          </div>


          <div v-else-if="successfullLoginEmail">
            <!-- Log Out -->
            <h1>Welcome! Your are logged in.</h1>

            <ui-form-field>
              <ui-button @click="deleteLogoutData" raised>Logout</ui-button>
            </ui-form-field>
          </div>

          <!-- RESPONSE FAIL MESSAGE -->
          <ui-alert v-if="postResult" state="info">Ausgeloggt.</ui-alert>
          <ui-alert v-if="postWrongLoginData" state="warning"> Du hast die falsche E-Mail oder Passwort eingegeben.
          </ui-alert>
          <!-- RESPONSE SUCCESS MESSAGE -->
          <ui-alert v-if="postSuccessResult" state="success">Super! Das hat geklappt.</ui-alert>

          <!-- Register and forgot password reroutes -->
          <ui-form-field>
            <router-link to="/AccountPWForgot">
              <ui-button raised>
                Passwort vergessen?
              </ui-button>
            </router-link>
          </ui-form-field>


          <ui-form-field>
            <router-link to="/accountregister">
              <ui-button raised>
                Registrieren
              </ui-button>
            </router-link>
          </ui-form-field>


          <ui-form-field v-if="successfullLoginEmail">
            <router-link to="/Datenschutzeinstellungen">
              <ui-button raised>
                Datenschutzeinstellungen
              </ui-button>
            </router-link>
          </ui-form-field>

          <ui-form-field v-if="successfullLoginEmail">
            <router-link to="/AdminMeldungen">
              <ui-button raised>
                Admin Bereich: Meldungen
              </ui-button>
            </router-link>
          </ui-form-field>


          <ui-form-field v-if="successfullLoginEmail">
            <router-link to="/Accountbearbeiten">
              <ui-button raised>
                Account bearbeiten
              </ui-button>
            </router-link>
          </ui-form-field>


        </ui-form>
      </div>
    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>


</template>
<script>
import http from "@/http-common";
import {useCookies} from "vue3-cookies";


export default {
  name: "AccountLogin",
  setup() {
    const {cookies} = useCookies();
    return {cookies};
  },

  data() {
    return {
      postResult: null,
      postSuccessResult: null,
      postWrongLoginData: null,
      vpassword: "",
      vemail: "",
      successfullLoginEmail: "",
    }
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },

    async postData() {
      try {
        const res = await http.post("login", {
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


        if (res.data === "Hallo") {
          this.cookies.set("LoggedInCookie", this.vemail);
          this.successfullLoginEmail = this.vemail;
          this.postWrongLoginData = null;
          this.postSuccessResult = this.fortmatResponse(result);
          this.postResult = null;
          console.log(this.successfullLoginEmail);

        } else if (res.data === "Login Page") {
          this.postWrongLoginData = this.fortmatResponse(result);
          this.postResult = null;
          this.postSuccessResult = null;
          console.log(this.successfullLoginEmail);
        }


      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
        this.postSuccessResult = null;
        this.postWrongLoginData = null;
      }
    },


    async deleteLogoutData() {
      try {
        const res = await http.delete("logout", {
              headers: {
                "x-access-token": "token-value",
                data: {}
              },
            })
        ;

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.postSuccessResult = this.fortmatResponse(result);
        this.postResult = null;
        this.cookies.remove("LoggedInCookie");
        this.successfullLoginEmail = false;
        this.postWrongLoginData = null;

      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
        this.postSuccessResult = null;
        // try {
        this.cookies.remove("LoggedInCookie");
        this.successfullLoginEmail = false;
        this.postWrongLoginData = null;
        // } catch (err) {
        //   console.log("Cookie was not Removed" || err)
        // }

      }
    },


    clearPostOutput() {
      this.postResult = null;
    },
  }
  ,
  mounted() {
    try {
      this.successfullLoginEmail = this.cookies.get("LoggedInCookie");
    } catch (err) {
      console.log(err)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>