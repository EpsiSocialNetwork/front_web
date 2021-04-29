<template>
  <div>
    <div class="profil">
      <div class="user-picture">
        <img class="icon-profil" src="https://picsum.photos/seed/picsum/128/128" width="80" height="80"/>
      </div>
      <div class="info-user">
        <span class="info-user_fullname">
          <b>{{fullname_user}}</b>
          <img :src="'https://flagcdn.com/20x15/'+flag+'.png'" width="20" height="15" >
        </span>
        <span>{{description}}</span>
        <div class="stat-activity">
          <span>{{follower_counter}} abonnés - {{follow_counter}} abonnements</span>
          <br/>
          <span>{{post_counter}} posts</span>
        </div>
      </div>
      <hr/>

      <button v-if="!is_follow" class="btn btn-raise element-lvl1 follow" @click="follow">Follow</button>
      <button v-else class="btn btn-raise element-lvl1 unfollow" @click="unfollow">Unfollow</button>

      <hr/>
      <br/>

    </div>
    <div class="post-area">
      <post_block v-for="item in my_post" :key="item.uid" :post="item" class="post-block"/>
    </div>
  </div>
</template>


<script>

  import axios from 'axios'
  import post_block from '@/components/post_block'

  export default {
    name: 'show_profil',
    components: { post_block },
    data () {
      return {
        fullname_user : this.$route.params.fullname_user,
        user_id:'',
        post_counter:0,
        follow_counter:0,
        follower_counter:0,
        my_post:[],
        is_follow:false,
        description:'',
        flag:'',
      }
    },
    created :async function() {
      let config = { method: 'get', url: `https://user.mignon.chat/user/fullname/${this.fullname_user}`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      await axios(config) .then( response => {
        this.user_id=response.data.uid
        this.description=response.data.description
        this.flag=response.data.codeCountry
      })
      .catch( error =>  console.log(error) )


      config = { method: 'get', url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}/follow`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => response.data.map(e=>e.followUidUser).includes(this.user_id)?this.is_follow=true:this.is_follow=false).catch( error =>  console.log(error) )

      config = { method: 'get', url: `https://post.mignon.chat/post/timeline/user?uids=${this.user_id}`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => {
        this.post_counter=response.data.length
        this.my_post=response.data
      })
      .catch( error =>  console.log(error) )

      config = { method: 'get', url: `https://user.mignon.chat/user/${this.user_id}/follow`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => this.follow_counter=response.data.length)
      .catch( error =>  console.log(error) )

      config = { method: 'get', url: `https://user.mignon.chat/user/${this.user_id}/following`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => this.follower_counter=response.data.length)
      .catch( error =>  console.log(error) )

    },
    methods : {
      follow: function() {
        let data = JSON.stringify({"uidUser": this.$root.keycloak.tokenParsed.user_id,"followUidUser": this.user_id})
        let config = {
          method: 'post',
          url: `https://user.mignon.chat/follow/`,
          headers: { 'Authorization': `Bearer ${this.$root.keycloak.token}`, 'Content-Type': 'application/json'},
          data : data
        }
        axios(config).then( response => {
          console.log(JSON.stringify(response.data))
          this.is_follow=true
        })
        .catch( error =>  console.log(error))
      },
      unfollow: function() { 
        let data = JSON.stringify({"uidUser": this.$root.keycloak.tokenParsed.user_id,"followUidUser": this.user_id})
        let config = {
          method: 'delete',
          url: `https://user.mignon.chat/follow/`,
          headers: { 'Authorization': `Bearer ${this.$root.keycloak.token}`, 'Content-Type': 'application/json'},
          data : data
        }
        axios(config).then( response => {
          console.log(JSON.stringify(response.data))
          this.is_follow=false
        })
        .catch( error =>  console.log(error))

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
  .follow {
    background-color: #210966;
  }
  .unfollow {
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