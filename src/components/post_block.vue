<template>
  <div class="post_block">
    <router-link style="text-decoration: none; color: inherit;" :to="`/post/${post.uid}`">
      <div class="clickable_post_part">
        <!-- HEADER POST -->
        <div class="header-post">
          <div class="user-info">
            <router-link style="text-decoration: none; color: inherit;" :to="`/${profile.fullname}`">
              <span><img class="icon-profil" :src="profile==undefined?profile.pictureProfile:default_picture" width="40" height="40"/></span>
            </router-link>
            <router-link style="text-decoration: none; color: inherit;" :to="`/${profile.fullname}`">
              <span class="user-info_fullname">{{profile.fullname}}</span>
            </router-link>
          </div>
          <div class="date-post">{{post_time}}</div>
        </div>
        <!-- CONTENT POST -->
        <div class="content-post">
          {{post.text.replace(/#[^\s]*/g,'')}}
        </div>
        <!-- TAG POST -->
        <div class="tag_post">
          <span v-for="tag in tags" class="tag">{{tag}}</span>
        </div>
      </div>
    </router-link>
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
          {{like_counter}}
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0ZM10.1 15.55L10 15.65L9.9 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 2.99 9.07 4.36H10.94C11.46 2.99 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55Z" :fill="liked?'red':'#4B4A4E'"/>
          </svg>
        </span>

        <span class="emoji_react" @click="emoji_react_show=!emoji_react_show" v-click-outside="emoji_react_close">
          <svg class="icon-3Gkjwa" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12.2512 2.00309C12.1677 2.00104 12.084 2 12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 11.916 21.999 11.8323 21.9969 11.7488C21.3586 11.9128 20.6895 12 20 12C15.5817 12 12 8.41828 12 4C12 3.31052 12.0872 2.6414 12.2512 2.00309ZM10 8C10 6.896 9.104 6 8 6C6.896 6 6 6.896 6 8C6 9.105 6.896 10 8 10C9.104 10 10 9.105 10 8ZM12 19C15.14 19 18 16.617 18 14V13H6V14C6 16.617 8.86 19 12 19Z"></path><path d="M21 3V0H19V3H16V5H19V8H21V5H24V3H21Z" fill="currentColor"></path></svg>
          <div v-if="emoji_react_show" class="emoji_menu" >
            <b v-for="item in emoji_list" @click="send_react(item)">{{item}}</b>
          </div>
        </span>
        <span class="react">
          <b v-for="item in reactions" class="react_item" @click="react_click(item)">
            {{item.user.length}}{{item.text}}
          </b>
        </span>
      </div>
      <div class="right">
        <span>{{view_counter}}</span>
        <span>
          <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z" fill="#4B4A4E"/>
          </svg>
        </span>
        
        
        <span class="edit_button" @click="edit_show=!edit_show" v-click-outside="closeEvent">
          <div v-if="edit_show" class="edit_menu" >
            <ul>
              <li @click="share_post">
                <svg fill="white" width="20" height="20" viewBox="0 0 24 24" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                <span>Partager</span>
              </li>
              <li v-if="$root.keycloak.tokenParsed.user_id==post.uidUser" @click="delete_post" class="edit_menu_delete">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF003D" class="r-daml9f r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path><path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path></g></svg> 
                <span>Delete</span>
              </li>
            </ul>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#4B4A4E"/>
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
        profile:{},
        default_picture:'https://picsum.photos/seed/picsum/128/128',
        post_time:0,
        tags:[],
        number_comments:0,
        view_counter:0,
        like_counter:0,
        liked:false,
        post_status:{},
        edit_show:false,
        emoji_react_show:false,
        emoji_list:['👍','👎','😍','😆','😈','😃','😢','😝','😱','🤔','😕','🎊','⚠','👏'],
        reactions:[],
      }
    },
    created : function() {
      this.get_profile()
    // Increment View
    let config = {method: 'put', url: `https://react.mignon.chat/${this.post.uid}/view`}
    axios(config).then( response => this.view_counter=response.data)
    .catch( error => console.log(error))

    // Get like, Share, View and React
    this.get_status_post()

    // Get Like for this post for this user
    config = { method: 'get', url: `https://react.mignon.chat/${this.post.uid}/like/${this.$root.keycloak.tokenParsed.user_id}`, headers: { } }
    axios(config).then( response => response.data==1?this.liked=true:{})
    .catch( error => console.log(error))

    this.tags=this.post.text.includes('#')?this.post.text.match(/#[^\s]*/g).map(e=>e.replace(/^./,'').toUpperCase()):this.tags

  },
  mounted : function(){



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

    /*let config = { method: 'get', url: `https://post.mignon.chat/post/${this.post.uid}/tag`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
      axios(config).then( response => this.tags=response.data )
      .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )*/

      let config = { method: 'get', url: `https://post.mignon.chat/post/${this.post.uid}/comment`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
      axios(config).then( response => this.number_comments=response.data.length )
      .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )


    },
    updated : function() {
      this.get_profile()
    },
    methods : {
      get_status_post: function(){
        const config = { method: 'get', url: `https://react.mignon.chat/${this.post.uid}`, headers: { } }
        axios(config).then( response => {
          this.post_status=response.data
          this.like_counter=response.data.like
          this.reactions=response.data.react
        })
        .catch( error =>console.log(error))
      },
      share_post:function(){
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
          if (result.state == "granted" || result.state == "prompt") 
            navigator.clipboard.writeText(`${window.location.origin}/post/${this.post.uid}`).then(() =>{}, ()=> {})
        })
      },
      react_click: function(react){
        if(react.user.includes(this.$root.keycloak.tokenParsed.user_id)){
          var config = {method: 'delete',url: `https://react.mignon.chat/${this.post.uid}/react/${this.$root.keycloak.tokenParsed.user_id}/${react.text}`,headers: { }}

          axios(config).then( response => this.get_status_post())
          .catch( error => console.log(error))
        } else {
          this.send_react(react.text)    
        }

      },
      send_react: function(react){
        const config = {method: 'post',url: `https://react.mignon.chat/${this.post.uid}/react/${this.$root.keycloak.tokenParsed.user_id}/${react}`,headers: { }}

        axios(config).then( response => this.get_status_post())
        .catch( error => console.log(error))
      },
      delete_post:function(){
        const config = { method: 'delete', url: `https://post.mignon.chat/post/${this.post.uid}`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
        axios(config).then( response => this.$emit('reload_after_send_post'))
        .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )
      },
      get_profile:function(){
        const config = { method: 'get', url: `https://user.mignon.chat/user/${this.post.uidUser}`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
        axios(config).then( response => this.profile=response.data)
        .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )
      },
      like: function() {
        let config
        if(this.liked) {
          config = { method: 'delete', url: `https://react.mignon.chat/${this.post.uid}/like/${this.keycloak.tokenParsed.user_id}`, headers: { } }
          axios(config).then( response => {this.liked=false;this.like_counter--})
          .catch( error =>  console.log(error))
        } else {
          config = { method: 'post', url: `https://react.mignon.chat/${this.post.uid}/like/${this.$root.keycloak.tokenParsed.user_id}`, headers: { } }
          axios(config).then( response => {this.liked=true;this.like_counter++})
          .catch(error => console.log(error))
        }
      },
      closeEvent: function () {
        if(this.edit_show)
          this.edit_show=false
      },
      emoji_react_close: function () {
        if(this.emoji_react_show)
          this.emoji_react_show=false
      },
      

    },
    watch : {},
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

  .user-info_fullname {margin-left:15px;}

  .content-post {text-align:left;}

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
  
  .icon-profil {border-radius:50%;}

  .react_post .left span{margin: 0 15px 0 5px;}

  .react_post .right span{
    margin: 0 5px 0 0px;
  }

  .react_post_like {
    z-index:10;
    cursor:pointer;
  }
  .clickable_post_part{cursor: pointer;}
  .clickable_post_part:hover{
    background-color: #EEE
  }
  .user-info_fullname:hover{
    text-decoration: underline;
  }
  .edit_button{cursor:pointer;}

  .edit_button{
    position: relative;
  }
  .edit_menu{
    position:absolute;
    background-color:#4B4A4E;
    border:0px solid black;
    border-radius: 5px;
    right:0;
  }
  .edit_menu ul {
    list-style: none;
    padding: 0px;
    margin: 0;
  }
  .edit_menu ul li {
    display:flex;
    flex-direction:row;
    flex-wrap: nowrap;
    padding:2px;
    border:0px solid black;
    border-radius: 5px;
    color:white;
  }

  .edit_menu ul li:hover {
    background-color: #292424;  
  }
  .edit_menu_delete{
    color:#FF003D !important; 
  }

  .emoji_react {
    position: relative;
    cursor: pointer;
  }
  .emoji_menu {
    position:absolute;
    background-color:#4B4A4E;
    border:0px solid black;
    border-radius: 5px;
    left:0;
    display: flex;
    flex-direction: row;
  }
  .emoji_menu b {
    margin:0;
    padding:0;
    display: block;
  }
  .emoji_menu b:hover{
    background-color: #292424;   
  }

  .react_item{
    cursor: pointer;
    border:0px solid black;
    border-radius: 5px;
    padding:2px;

  }
  .react_item:hover{
    background-color: #4B4A4E;   
  }

  .react{
    font-size: 13px;
    padding: 0;
    margin: 0;
  }

</style>