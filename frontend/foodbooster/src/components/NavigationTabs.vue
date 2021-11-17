<template>
  <ui-tabs :items="tabItems"></ui-tabs>
</template>

<script>
export default {
  name: "NavigationTabs",
  data: () => ({
    tabItems: [
      {
        text: 'Home', // label text
        icon: 'icon', // label icon
      },
      {
        text: 'Rezepte',
        icon: 'icon',
      },
      {
        text: 'Featured Rezepte',
        icon: 'icon',
      },
      {
        text: 'Forum',
        icon: 'icon',
      },
      {
        text: 'Einkaufsliste',
        icon: 'icon',
      },
      {
        text: 'Ernähungsplan',
        icon: 'icon',
      },
      {
        text: 'Account',
        icon: 'icon',
      },
    ]
  })
}


</script>

<style lang="scss" scoped>

</style>