<template>


  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">
      <h1>Account bearbeiten.</h1>

      <h3>Hier kannst du dein Username ändern.</h3>
      <h3>Hier kannst du dein Passwort ändern.</h3>

      <!--  <ui-grid class="demo-grid">-->
      <!--    <ui-grid-cell columns="4" class="demo-cell">-->

      <div class="alleBoxen">
        <ui-form nowrap item-margin-bottom="16" label-width="80">
          <template #default="{ actionClass }">


            <!-- Username -->
            <ui-form-field>
              <label class="required">Username:</label>
              <ui-textfield v-model="vname" required>
                Name deines Users
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


            <!-- SUBMIT -->
            <ui-form-field :class="actionClass">
              <ui-button @click="postData" raised>Profil aktualisieren</ui-button>
            </ui-form-field>

            <!-- RESPONSE FAIL MESSAGE -->
            <ui-alert v-if="postResult" state="info">{{ postResult }}</ui-alert>
            <!-- RESPONSE SUCCESS MESSAGE -->
            <ui-alert v-if="postSuccessResult" state="success">Super, Profil wurde geändert.
            </ui-alert>


          </template>
        </ui-form>


        <!--    </ui-grid-cell>-->
        <!--  </ui-grid>-->

      </div>

    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>
</template>

<script>
import http from "@/http-common";


export default {
  name: "Accountbearbeiten",
  data() {
    return {
      postResult: null,
      postSuccessResult: null,


    };
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },

    async postData() {
      try {
        const res = await http.put("XXXXXEINFÜGEN/", {
          Haustierprofil_ID: this.haustierprofil_ID,
          name: this.vname,


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
  }

}

</script>

<style lang="scss" scoped>

ui-form {
  padding: 50px;
  //margin-left: 50px;
}

h1 {
  padding: 20px;
}

ul {
  list-style-type: none;
}

/* extends demo2 */
.preview-list {

  & > .item {

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 48px;
    }

    &.add-btn {

      .mdc-file {
        position: relative;
        width: 25%;
        height: 0;
        padding-bottom: 25%;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
        background-color: #fff;
      }

      .add-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 48px;
      }

    }
  }
}
</style>