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
              <label class="required" pattern=".{,20}">Username:</label>
              <ui-textfield type="text" required>Username</ui-textfield>
            </ui-form-field>

            <!-- EMAIL -->
            <ui-form-field>
              <label class="required">E-Mail:</label>
              <ui-textfield type="text" required>E-Mail Adresse</ui-textfield>
            </ui-form-field>

            <!-- PASSWORD -->
            <ui-form-field>
              <label class="required">Password:</label>
              <ui-textfield
                  input-type="password"
                  required
                  pattern=".{8,}"
                  helper-text-id="pw-validation-msg"
                  :attrs="{autocomplete: 'current-password'}"
              >
                Choose password
              </ui-textfield>
              <ui-textfield-helper id="pw-validation-msg" visible validMsg>
                Must be at least 8 characters long
              </ui-textfield-helper>
            </ui-form-field>

            <!-- PASSWORD CONFIRM -->
            <ui-form-field>
              <label class="required">Password:</label>
              <ui-textfield
                  input-type="password"
                  required
                  pattern=".{8,}"
                  helper-text-id="pw-validation-msg"
                  :attrs="{autocomplete: 'current-password'}"
              >
                Conform password
              </ui-textfield>
              <ui-textfield-helper id="pw-validation-msg" visible validMsg>
                Please confirm the password.
              </ui-textfield-helper>
            </ui-form-field>

            <!-- NEWSLETTER -->
            <ui-form-field>
              <ui-checkbox helper-text-id="newsletter-validation-msg"></ui-checkbox>
              <ui-textfield-helper id="newsletter-validation-msg" visible validMsg>
                Yes i want to subscribe to the newsletter.
              </ui-textfield-helper>
            </ui-form-field>

            <!-- SUBMIT -->
            <ui-form-field :class="actionClass">
              <ui-button raised>Submit</ui-button>
              <ui-button outlined>Cancel</ui-button>
            </ui-form-field>
          </template>
        </ui-form>
      </div>
    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>


</template>

<script>
export default {
  name: "AccountRegister"
}
</script>

<style lang="scss" scoped>

</style>