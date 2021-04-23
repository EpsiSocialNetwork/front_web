<template>
  <div>
    <img src="@/assets/logo.svg"/>
    <button class="btn btn-primary element-lvl1" @click="$router.push('/')">🏠</button>
    <input class="input-credential element-lvl1" v-model="fullname" placeholder="Pseudo" type="text">
    <input class="input-credential element-lvl1" v-model="password" placeholder="Mot de passe" type="password">
    <button class="btn btn-raise element-lvl1" @click="login()">Se connecter</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      fullname:'',
      password:'',
    }
  },
  created : function() {

  },
  methods : {
    login: function() {
      this.$root.user.fullname = this.fullname

      

      this.$router.push(`${this.$root.user.fullname}`)
    }
  },
  watch : {}
}
</script>

<style scoped>
</style>