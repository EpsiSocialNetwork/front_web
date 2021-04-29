<template>
  <div class="top-bar">
    <span @click="$router.push('/')"><logo class="logo"/></span>
    <img @click="go_to_profile" v-if="$router.currentRoute.name!='profil'" class="icon-profil" src="https://picsum.photos/seed/picsum/128/128" width="60" height="60"/>
  </div>
</template>

<script>

import logo from '@/components/logo'
import axios from 'axios'
export default {
  name: 'top_bar',
  components: {logo},
  data () {
    return {}
  },
  created : function() {},
  mounted : function(){},
  methods : {
    go_to_profile: function(){

        var config = {
          method: 'get',
          url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}`,
          headers: { 'Authorization': `Bearer ${this.$root.keycloak.token}`}
        }

        axios(config).then( response => {
          console.log(JSON.stringify(response.data))
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

</style>