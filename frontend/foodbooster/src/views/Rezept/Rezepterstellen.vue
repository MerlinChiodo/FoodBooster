<template>
  <ui-grid class="demo-grid">
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
    <ui-grid-cell class="demo-cell">


      <div class="CreateRezeptBox">

        <h1>Erstelle ein neues Rezept</h1>
        <ui-form nowrap item-margin-bottom="16" label-width="80">
          <template #default="{ actionClass }">

            <!-- Rezeptname -->
            <ui-form-field>
              <label class="required"> Name: </label>
              <ui-textfield v-model="name" required>
                Rezeptname
              </ui-textfield>
            </ui-form-field>


            <!-- DATENSCHUTZBEDINGUNGEN AKZEPTIEREN -->
            <ui-form-field>
              <ui-checkbox v-model="datenschutzChecked" input-id="checkbox"></ui-checkbox>
              <ui-textfield-helper id="newsletter-validation-msg" visible validMsg>* Ja ich akzeptiere die
                <router-link to="/Datenschutzerklaerung">
                  Datenschutzbedingungen
                </router-link>
                .
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
            <ui-form-field v-if="datenschutzChecked" :class="actionClass">
              <ui-button @click="postData" raised>Registrieren</ui-button>
            </ui-form-field>

            <!-- RESPONSE FAIL MESSAGE -->
            <ui-alert v-if="postResult" state="info">{{ postResult }}</ui-alert>
            <!-- RESPONSE SUCCESS MESSAGE -->
            <ui-alert v-if="postSuccessResult" state="success">Erforlgreich Registriert.</ui-alert>

          </template>
        </ui-form>
      </div>
    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>


</template>

<script>
export default {
  name: "Rezept_erstellen"
}
</script>

<style scoped>

</style>