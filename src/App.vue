<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  const axios = require('axios')
  export default {
    name: 'App',
    created: function() {

      // If user doesn't exist, redirect to /register
      var config = {
        method: 'get',
        url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}`,
        headers: { 'Authorization': `Bearer ${this.$root.keycloak.token}`}
      }
      axios(config).then( response => response.data?undefined:this.$router.push('/register'))
      .catch( error =>  console.log(error))
    }

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
