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
              <ui-textfield type="text" required>E-Mail Adresse</ui-textfield>
            </ui-form-field>

            <!-- PASSWORD -->
            <ui-form-field>
              <label class="required">Password:</label>
              <ui-textfield
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
              <ui-button raised>Sign in</ui-button>
            </ui-form-field>

            <!-- Register and forgot password reroutes -->
            <ui-form-field>
              <router-link to="/forgotpassword">
                forgot password
              </router-link>
            </ui-form-field>
            <router-link to="/accountregister">
                Sign up
              </router-link>
          </template>
        </ui-form>
      </div>
    </ui-grid-cell>
    <ui-grid-cell class="demo-cell"></ui-grid-cell>
  </ui-grid>


</template>
<script>
export default {
  name: "AccountLogin"
}
</script>

<style lang="scss" scoped>

</style>