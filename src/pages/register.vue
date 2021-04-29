<template>
  <div>
    <img src="@/assets/logo.svg"/>
    <button class="btn btn-primary element-lvl1" @click="$router.push('/')">🏠</button>
    <label class="label" for="email">Email</label>
    <input class="input-credential element-lvl1" name="email" v-model="email" placeholder="email" type="text">
    <label class="label" for="username">Username</label>
    <input class="input-credential element-lvl1" v-model="username" placeholder="username" type="text">
    <label class="label" for="fullname">Fullname</label>
    <input class="input-credential element-lvl1" v-model="fullname" placeholder="fullname" type="text">
    <label class="label" for="description">Description</label>
    <input class="input-credential element-lvl1" v-model="description" placeholder="description" type="text">
    <label class="label" for="codeCountry">codeCountry</label>
    <input class="input-credential element-lvl1" v-model="codeCountry" placeholder="codeCountry" type="text">
    <button class="btn btn-raise element-lvl1" @click="login()">S'enregistrer</button>
  </div>
</template>

<script>
  import axios from 'axios'


  export default {
    name: 'register',
    data () {
      return {
        password:'',
        email: this.$root.keycloak.tokenParsed.email,
        username: `${this.$root.keycloak.tokenParsed.given_name} ${this.$root.keycloak.tokenParsed.family_name}`,
        fullname: this.$root.keycloak.tokenParsed.name.replace(/\s/g,'_'),
        description: '',
        pictureProfile: String,
        codeCountry: "FR"
      }
    },
    created : function() {


    },
    methods : {
      login: function() {

        let data = JSON.stringify({
          "uid": this.$root.keycloak.tokenParsed.user_id,
          "email": this.email,
          "password": "mySecurePassword",
          "username": this.username,
          "fullname": this.fullname,
          "description": this.description,
          "pictureProfile": this.pictureProfile,
          "codeCountry": this.codeCountry
        })

        var config = {
          method: 'post',
          url: `https://user.mignon.chat/user/`,
          headers: { 'Authorization': `Bearer ${this.$root.keycloak.token}`, 'Content-Type': 'application/json'},
          data : data
        }

        axios(config).then( response => {
          console.log(JSON.stringify(response.data))
          this.$router.push('/home')
        })
        .catch( error =>  console.log(error))
      }
    },
    watch : {}
  }
</script>

<style scoped>
</style>