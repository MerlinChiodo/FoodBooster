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
              <ui-textfield type="text" required>Nutzername</ui-textfield>
            </ui-form-field>

            <!-- EMAIL -->
            <ui-form-field>
              <label class="required">E-Mail:</label>
              <ui-textfield type="text" pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+" required>E-Mail Adresse
              </ui-textfield>
            </ui-form-field>

            <!-- Sicherheitsfrage -->
            <ui-form-field>
              <label class="required">Sicherheitsfrage</label>
              <ui-textfield type="text" required>Wo bist du geboren?</ui-textfield>
            </ui-form-field>

            <!-- PASSWORD -->
            <ui-form-field>
              <label class="required">Passwort:</label>
              <ui-textfield
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

            <!-- PASSWORD CONFIRM -->
            <ui-form-field>
              <label class="required">Passwort:</label>
              <ui-textfield
                  input-type="password"
                  required
                  pattern=".{8,}"
                  helper-text-id="pw-validation-msg"
                  :attrs="{autocomplete: 'current-password'}"
              >
                Passwort bestätigen
              </ui-textfield>
              <ui-textfield-helper id="pw-validation-msg" visible validMsg>
                Bitte bestätigen Sie das Passwort.
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
              <ui-button raised>Registrieren</ui-button>
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