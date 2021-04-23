<template>
  <div @click="$router.push(`/post/${post.uid}`)">
    
    <!-- HEADER POST -->
    <div class="header-post">
      <div class="user-info">
        <span><img @click="$router.push(`/${profile.fullname}`)" class="icon-profil" :src="profile==undefined?profile.pictureProfile:default_picture" width="40" height="40"/></span>
        <span class="user-info_fullname">{{profile.fullname}}</span>
      </div>
      <div class="date-post">{{post_time}}</div>
    </div>
    <!-- CONTENT POST -->
    <div class="content-post">
      {{post.text}}
    </div>
    <!-- TAG POST -->
    <div class="tag_post">
      <span v-for="tag in tags" class="tag">{{tag}}</span>
    </div>
    <!-- REACT POST -->
    <hr/>
    <div class="react_post">
      <div class="left">
        <span>
          {{number_comments}}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.99 2C19.99 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H16L20 20L19.99 2ZM16 12H4V10H16V12ZM16 9H4V7H16V9ZM16 6H4V4H16V6Z" fill="#4B4A4E"/>
          </svg>
        </span>
        <span class="react_post_like" @click="like()">
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0ZM10.1 15.55L10 15.65L9.9 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 2.99 9.07 4.36H10.94C11.46 2.99 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55Z" :fill="liked?'red':'#4B4A4E'"/>
          </svg>
        </span>
      </div>
      <div class="right">
        <span>{{view_counter}}</span>
        <span>
          <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z" fill="#4B4A4E"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'post_block',
  props:['post',],
  data () {
    return {
      profile:Object,
      default_picture:'https://picsum.photos/seed/picsum/128/128',
      post_time:0,
      tags:Array,
      number_comments:0,
      view_counter:0,
      liked:false
    }
  },
  created : function() {

    // Increment View
    let config = {method: 'put', url: `https://react.mignon.chat/${this.post.uid}/view`}
    axios(config).then( response => this.view_counter=response.data)
    .catch( error => console.log(error))

    // Get like, Share, View and React
    config = { method: 'get', url: `https://react.mignon.chat/${this.post.uid}`, headers: { } }
    axios(config).then( response => console.log(JSON.stringify(response.data)))
    .catch( error =>console.log(error))

    // Get Like for this post for this user
    config = { method: 'get', url: `https://react.mignon.chat/${this.post.uid}/like/${this.$root.user.uid}`, headers: { } }
    axios(config).then( response => response.data==1?this.liked=true:{})
    .catch( error => console.log(error))

  },
  mounted : function(){
    this.get_profile()


      let diff = {}                           // Initialisation du retour
      let tmp = new Date()-new Date(this.post.createdAt)
      tmp = Math.floor(tmp/1000)             // Nombre de secondes entre les 2 dates
      diff.sec = tmp % 60                   // Extraction du nombre de secondes
      tmp = Math.floor((tmp-diff.sec)/60)    // Nombre de minutes (partie entière)
      diff.min = tmp % 60                    // Extraction du nombre de minutes 
      tmp = Math.floor((tmp-diff.min)/60)    // Nombre d'heures (entières)
      diff.hour = tmp % 24                   // Extraction du nombre d'heures
      tmp = Math.floor((tmp-diff.hour)/24)   // Nombre de jours restants
      diff.day = tmp
      diff
    

    this.post_time=`${diff.day?`${diff.day}d`:diff.hour?`${diff.hour}h`:diff.min?`${diff.min}m`:`${diff.sec}s`}`

    let config = { method: 'get', url: `https://post.mignon.chat/post/${this.post.uid}/tag`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
      axios(config).then( response => this.tags=response.data )
      .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )

    config = { method: 'get', url: `https://post.mignon.chat/post/${this.post.uid}/comment`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
    axios(config).then( response => this.number_comments=response.data.length )
    .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )
    
    
  },
  updated : function() {
    this.get_profile()
  },
  methods : {
    get_profile:function(){
      const config = { method: 'get', url: `https://user.mignon.chat/user/${this.post.uidUser}`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
      axios(config).then( response => this.profile=response.data)
      .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )
    },
    like: function() {
      let config
      if(this.liked) {
        config = { method: 'delete', url: `https://react.mignon.chat/${this.post.uid}/like/${this.$root.user.uid}`, headers: { } }
        axios(config).then( response => this.liked=false)
        .catch( error =>  console.log(error))
      } else {
        config = { method: 'post', url: `https://react.mignon.chat/${this.post.uid}/like/${this.$root.user.uid}`, headers: { } }
        axios(config).then( response => this.liked=true)
        .catch(error => console.log(error))
      }
    }
  },
  watch : {}
}
</script>

<style scoped>

.user-info {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */
  /*text-align: center;*/
  display: flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-evenly;
  align-items:center;
}

.user-info_fullname {
  margin-left:15px;
}

.content-post {
  text-align:left;
}

.date-post {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
}

.header-post {
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
  align-items:center;
}

.tag_post {
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:flex-start; 

}

.tag {
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 11px;
  color: #FFFFFF;
  padding: 5px;
  background-color:#210966;
  margin-right:15px;
  border-radius:5px;

}

.react_post {
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
}

.icon-profil {
  border-radius:50%;
}

.react_post .left span{
  margin: 0 15px 0 5px;
}

.react_post .right span{
  margin: 0 5px 0 0px;
}

.react_post_like {
  z-index:10;
}
</style>