<template>
  <div id="welcome">
    <h1>👋 Welcome on PostHoop</h1>
    <img src="@/assets/logo.svg"/>
    <p>Modelez votre Hoop sphère à votre image.</p>
    <button class="btn btn-primary element-lvl1" @click="login()">Inscription</button>
    <button class="btn btn-primary element-lvl1" @click="login()">Connexion</button>
  </div>
</template>

<script>
  import * as Keycloak from 'keycloak-js'

  export default {
    name: 'welcome',
    data () {
      return {}
    },
    created : function() {
    },
    methods : {
      login: function() {

        let initOptions = {
          url: 'https://keycloak.mignon.chat/auth', realm: 'posthoop', clientId: 'api', onLoad:'login-required'
        }
        let keycloak = Keycloak(initOptions)

        //keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => console.log(auth))
        // keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {
        //   this.$router.push('/home')
        //   if(!auth) {
        //     Vue.$log.info("Authentification FAILED !")
        //   } else {
        //     Vue.$log.info("Authenticated")
        //     this.$root.keycloak=keycloak
        //     setInterval(() =>{
        //       keycloak.updateToken(70).success((refreshed)=>{
        //         if (refreshed) {
        //           Vue.$log.debug('Token refreshed')
        //         } else {
        //           Vue.$log.warn('Token not refreshed, valid for '
        //             + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
        //         }
        //       }).error(()=> Vue.$log.error('Failed to refresh token'))
        //     }, 60000)

            
        //   }
        // }).error(() => Vue.$log.error("Authenticated Failed"))
      }
    },
    watch : {}
  }
</script>

<style scoped>
  img {
    margin: 10px 0 20px 0;
  }

  #welcome {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
 }
</style>