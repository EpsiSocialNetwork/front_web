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

    <label class="label" for="pictureProfil">Image de profile</label>
    <!-- <input type="file" id="pictureProfil" ref="pictureProfil" v-on:change="handleFileUpload()"/> -->
    <input type="file" @change="handleFileUpload" ref="pictureProfil" name="pictureProfil" id="image"  accept="image/*" >

    <button class="btn btn-raise element-lvl1" @click="login()">S'enregistrer</button>
  </div>
</template>

<script>
  import axios from 'axios'
  import FormData from 'form-data'


  export default {
    name: 'register',
    data () {
      return {
        password:'',
        email: this.$root.keycloak.tokenParsed.email,
        username: `${this.$root.keycloak.tokenParsed.given_name} ${this.$root.keycloak.tokenParsed.family_name}`,
        fullname: this.$root.keycloak.tokenParsed.name.replace(/\s/g,'_'),
        description: '',
        pictureProfile: '',
        codeCountry: "FR",
        file:{},
      }
    },
    created : function() {


    },
    methods : {
      upload_file:function(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Client-ID cd407d8b957f6a9")
        myHeaders.append("Cookie", "IMGURSESSION=172bfc2b1d03d6bfec5798eada3e6d36; _nc=1")

        var formdata = new FormData()
        formdata.append("image", "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")
        //formdata.append("image", fileInput.files[0], "/D:/Image/1800px-gnu_bash_logo.png");

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        }

        fetch("https://api.imgur.com/3/image", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))

      },
      handleFileUpload:function(){
        this.file = this.$refs.pictureProfil.files[0];
      },
      login: function() {

        //this.upload_file()
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

        let config = {
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