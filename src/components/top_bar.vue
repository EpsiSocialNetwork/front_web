<template>
  <div class="top-bar">
    <span @click="back_home"><logo class="logo"/></span>
    <img @click="go_to_profile" v-if="$router.currentRoute.name!='profil'" class="icon-profil" :src="picture_profile" width="60" height="60"/>
    <div class="loading" v-if="loading"><img src="https://static.wixstatic.com/media/07cbd3_597548454e0b4271bbf494f9c1e09afd~mv2.gif"></div>
  </div>
</template>

<script>

  import logo from '@/components/logo'
  import axios from 'axios'
  const sound = require('@/assets/bear-groan.mp3')
  const sound2 = require('@/assets/laser_saber.mp3')
  export default {
    name: 'top_bar',
    components: {logo},
    data () {
      return {
        loading:false,
        audio:new Audio(sound),
        picture_profile:"https://picsum.photos/seed/picsum/128/128"
      }
    },
    created : function() {
      var config = {
        method: 'get',
        url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}`,
        headers: { 'Authorization': `Bearer ${this.$root.keycloak.token}`}
      }

      axios(config).then( response => {
        this.picture_profile=response.data.pictureProfile.startsWith('http')?response.data.pictureProfile:this.picture_profile
      })
      .catch( error =>  console.log(error))
      
    },
    mounted : function(){},
    methods : {
      back_home: function(argument) {
        new Audio(sound2).play()
        this.$router.push('/')
      },
      go_to_profile: function(){
        this.audio.play()
        

        this.loading=true
        var config = {
          method: 'get',
          url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}`,
          headers: { 'Authorization': `Bearer ${this.$root.keycloak.token}`}
        }

        axios(config).then( response => {
          console.log(JSON.stringify(response.data))
          this.loading=false
          this.$router.push(`/${response.data.fullname}`)
        })
        .catch( error =>  console.log(error))
      }
    },
    watch : {}
  }
</script>

<style scoped>
  .top-bar {
    background-color: var(--top-bg-color);
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
    justify-content:space-evenly;
    align-items:center;
    padding:15px;
    height:10vh;
  }
  .icon-profil:hover{cursor:pointer;}
  .icon-profil {
    border-radius:50%;
  }
  .logo:hover{cursor:pointer;}
  .logo {
    max-height:70px;
  }
  .loading{
    position: absolute;
    top:0;
    right:50%;
    height: 100%;
    width: 100%;
    transform: translateX(50%);
    background-color: white;
    z-index:999;
  }

</style>