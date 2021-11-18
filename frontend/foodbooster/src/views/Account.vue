<template>
  <div class="AccountRegisterBox">
    <ui-form nowrap item-margin-bottom="16" label-width="80">
      <template #default="{ subitemClass, actionClass }">
        <ui-form-field>
          <label class="required">E-Mail Adresse:</label>
          <ui-textfield>E-Mail Adresse</ui-textfield>
        </ui-form-field>
        <ui-form-field>
          <label class="required">Password:</label>
          <ui-textfield>Password</ui-textfield>
        </ui-form-field>
        <ui-form-field>
          <label class="required">Confirm Password:</label>
          <ui-textfield>Confirm Password</ui-textfield>
        </ui-form-field>
        <ui-form-field>
          <label>Checkbox:</label>
          <div :class="subitemClass">
            <ui-form-field v-for="i in 3" :key="i">
              <ui-checkbox :value="i" :input-id="`checkbox-${i}`"></ui-checkbox>
              <label :for="`checkbox-${i}`">Checkbox {{ i }}</label>
            </ui-form-field>
          </div>
        </ui-form-field>
        <ui-form-field :class="actionClass">
          <ui-button raised>Submit</ui-button>
          <ui-button outlined>Cancel</ui-button>
        </ui-form-field>
      </template>
    </ui-form>
  </div>
</template>

<script>
export default {
  name: "Account"
}
</script>

<style lang="scss" scoped>

</style>