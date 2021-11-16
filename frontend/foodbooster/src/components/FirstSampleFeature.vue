<!-- Please work in your proper feature Branches. -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<!-- Here comes all the scripts you have to implement to serve any functions. -->
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS(in our case SCSS to this component only -->
<!-- lang="scss" have to be used in every vue File to use the extended SCSS(css) possibilities.  -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
