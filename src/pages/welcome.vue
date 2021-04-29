<template>
  <div id="welcome">
    <h1>👋 Welcome on PostHoop</h1>
    <img src="@/assets/logo.svg"/>
    <p>Modelez votre Hoop sphère à votre image.</p>


    <button class="btn btn-primary element-lvl1" @click="login">Inscription</button>
    <button class="btn btn-primary element-lvl1" @click="login">Connexion</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import login from '@/pages/login'
  export default {
    name: 'welcome',
    data () {
      return {}
    },
    created : function() {
    },
    methods : {
      login: function() {
        this.$router.push('/login')
        /*new Vue({
          el: '#welcome',
          components: { login },
          template: '<login/>'
        })*/
        /*this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
        this.keycloak = Keycloak(this.initOptions)
        
        this.keycloak.init({ onLoad: this.initOptions.onLoad }).then( (auth) => {
          console.log(this.keycloak)
          if(!auth)
            window.location.reload()
          else
            Vue.$log.info("Authenticated")
          new Vue({
            el: '#app',
            router,
            components: { App },
            template: '<App/>',
            data:{user: {fullname: '', uid: 'FAKE_UID_USER'}, keycloak:this.keycloak},
            render: h => h(App),
          }).$mount('#app')

          setInterval(() =>{
            this.keycloak.updateToken(70).then((refreshed)=>{
              if (refreshed) {
                Vue.$log.debug('Token refreshed')
              } else {
                Vue.$log.warn('Token not refreshed, valid for '
                  + Math.round(this.keycloak.tokenParsed.exp + this.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
              }
            }).catch( ()=>Vue.$log.error('Failed to refresh token') )
          }, 60000)
        }).catch(() => Vue.$log.error("Authenticated Failed"))*/
        
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