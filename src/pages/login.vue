<template>
  <div class="login">
    <img src="@/assets/logo.svg"/>
    <button class="btn btn-primary element-lvl1" @click="reload">🏠</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import App from '@/App'
  import * as Keycloak from 'keycloak-js'
  import router from '@/router'

  export default {
    name: 'login',
    data () {
      return {
        initOptions: {url: 'https://keycloak.mignon.chat/auth', realm: 'posthoop', clientId: 'api', onLoad:'login-required'},
        keycloak: {},

      }
    },
    mounted : function() {
      
      this.keycloak =  Keycloak(this.initOptions)
      this.keycloak.init({ onLoad: this.initOptions.onLoad }).success( auth => {
        if(!auth)
          window.location.reload()
        else
          Vue.$log.info("Authenticated")
        // localStorage.setItem("vue-token", keycloak.token)
        // localStorage.setItem("vue-refresh-token", keycloak.refreshToken)
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)

        new Vue({
          el: '#app',
          router,
          components: { App },
          template: '<App/>',
          data:{user: {fullname: '', uid: 'FAKE_UID_USER'}, keycloak:this.keycloak},
          render: h => h(App),
        }).$mount('#app')

        setInterval(() =>{
          this.keycloak.updateToken(70).success((refreshed)=>{
            if (refreshed) {
              Vue.$log.debug('Token refreshed')
            } else {
              Vue.$log.warn('Token not refreshed, valid for '
                + Math.round(this.keycloak.tokenParsed.exp + this.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
            }
          }).error(()=> Vue.$log.error('Failed to refresh token') )
        }, 60000)
        router.push('/')
      }).error(() => Vue.$log.error("Authenticated Failed") )

    },
    methods : {
      reload: function(){
        window.location.href=window.location.origin
      }
    },
    watch : {}
  }
</script>

<style scoped>
  img {
    margin: 10px 0 20px 0;
  }
  .login {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
 }
</style>