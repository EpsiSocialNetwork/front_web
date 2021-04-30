<template>
  <div>
    <div class="profil">
      <div class="user-picture">
        <!-- <img @click="remove" class="edit" src="@/assets/edit.svg"/> -->

        <img class="icon-profil" :src="pictureProfile" width="80" height="80"/>

        <!-- <img @click="remove" class="trash" src="@/assets/trash.svg"/> -->

      </div>
      <div class="info-user">
        <span class="info-user_fullname">
          <b>{{fullname_user}}</b>
          <img :src="'https://flagcdn.com/20x15/'+flag.toLowerCase()+'.png'" width="20" height="15" >
        </span>
        <span class="info-user_email">{{$root.keycloak.tokenParsed.email}}</span>
        <br/>
        <span>{{description}}</span>
        <div class="stat-activity">
          <span>{{follower_counter}} abonnés - {{follow_counter}} abonnements</span>
          <br/>
          <span>{{post_counter}} posts</span>
        </div>
      </div>
      <hr/>

      <button class="btn btn-raise element-lvl1 deconnection" @click="logout">
        Déconnexion
      </button>
      <hr/>
      <br/>
    </div>
    <div class="post-area">
      <post_block v-for="item in my_post" :key="item.uid" :post="item" class="post-block"/>
    </div>
    <!-- <img src="@/assets/illustration.svg" /> -->
  </div>
</template>


<script>

  import axios from 'axios'
  import post_block from '@/components/post_block'

  export default {
    name: 'my_profil',
    components: { post_block },
    data () {
      return {
        fullname_user : this.$route.params.fullname_user,
        post_counter:0,
        follow_counter:0,
        follower_counter:0,
        my_post:[],
        description:'',
        flag:'',
        pictureProfile:'https://picsum.photos/seed/picsum/128/128'
      }
    },
    created : function() {
      let config = { method: 'get', url: `https://post.mignon.chat/post/timeline/user?uids=${this.$root.keycloak.tokenParsed.user_id}`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => {
        this.post_counter=response.data.length
        this.my_post=response.data
      })
      .catch( error =>  console.log(error) )

      config = { method: 'get', url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}/follow`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => this.follow_counter=response.data.length)
      .catch( error =>  console.log(error) )

      config = { method: 'get', url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}/following`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => this.follower_counter=response.data.length)
      .catch( error =>  console.log(error) )

      config = { method: 'get', url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => {
        if(this.fullname_user!=response.data.fullname){
          this.fullname_user=response.data.fullname
          this.$router.push(`/${response.data.fullname}`)
        }
        this.description=response.data.description
        this.flag=response.data.codeCountry
        this.pictureProfile=response.data.pictureProfile.startsWith('http')?response.data.pictureProfile:this.pictureProfile
      })
      .catch( error =>  console.log(error) )




    },
    methods : {
      logout: function() {
        new Audio(require('@/assets/nooo.swf.mp3')).play()
        this.$root.keycloak.logout()
        this.$router.push('/')
      },
      remove: function() {
        alert('⚠ Cheh tu peux pas ! ⚠')
      }
    },
    watch : {}
  }
</script>

<style scoped>
  .trash{
    border: 1px solid #FF003D;
    border-radius: 50%;
    padding:15px;
  }
  .edit{
    border: 1px solid #210966;
    border-radius: 50%;
    padding:15px;
  }
  .deconnection {
    background-color: #FF003D;
  }
  .info-user_email {
    margin-top:15px;
  }
  .info-user_fullname {
    margin-top:15px;
  }
  .stat-activity {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin-top:15px;
  }

  .user-picture {
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
    justify-content:center;
    align-items:center;
    margin-top: 10px;

  }
  .profil{
    height:31vh;
  }
  .user-picture img {
    margin: 0 50px;
  }

  .info-user {
    display:flex;
    flex-direction:column;
    flex-wrap:nowrap;
    margin-top:10px;
  }

  .icon-profil {
    border-radius:50%;
  }

  .post-area {
    height: 47vh;
    border: none;
    padding: 5px;
    overflow: scroll;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  ::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;  
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #999;  
  }

  .post-block {
    max-width:45%;
    min-width:40%;
    padding: 5px;
    margin: 0 auto 25px auto;
  }
  .post-block:hover {
    background-color: #F9F9F9
  }

</style>