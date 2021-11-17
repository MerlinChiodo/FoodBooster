<template>
  <h1>Home</h1>
</template>

<script>
export default {
  name: "Home",
  computed: {
    username() {
      // params
      return this.$route.params.username
    },
  },
  // methods: {
  //   goToDashboard() {
  //     if (true) {//isAuthenticated
  //       this.$router.push('/dashboard')
  //     } else {
  //       this.$router.push('/login')
  //     }
  //   }
  //   ,
  // },
}

</script>

<style lang="scss" scoped>

</style>