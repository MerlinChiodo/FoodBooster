<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">
      <div class="AccountRegisterBox">
        <h1>Passwort vergessen</h1>
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

            <!-- Sicherheitsfrage -->
            <ui-form-field>
              <label class="required">Sicherheitsfrage</label>
              <ui-textfield v-model="vanswer" required
                >Wo bist du geboren?</ui-textfield
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
            <ui-form-field :class="actionClass">
              <ui-button @click="postData" raised>Passwort ändern</ui-button>
            </ui-form-field>
          </template>

          <script>
            export default {
              name: "AccountPWForgot",
            };
          </script>

          <style scoped></style
        ></ui-form></div></ui-grid-cell
  ></ui-grid>
</template>
