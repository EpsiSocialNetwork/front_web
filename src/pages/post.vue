<template>
  <div>
    <post_textarea class="comment" v-if="comment_window_enable" v-on:send="send_comment"/>  
    <top_bar/>
    <div class="post-area">
      <post_block :key="post.uid" :post="post" class="post-block"/>
      <br/>

      <svg @click="comment" v-if="comments.length==0" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#4B4A4E"/>
      </svg>

      <svg @click="comment" v-else width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8H14V11H11V13H14V16H16V13H19V11H16V8ZM2 12C2 9.21 3.64 6.8 6.01 5.68V3.52C2.52 4.76 0 8.09 0 12C0 15.91 2.52 19.24 6.01 20.48V18.32C3.64 17.2 2 14.79 2 12ZM15 3C10.04 3 6 7.04 6 12C6 16.96 10.04 21 15 21C19.96 21 24 16.96 24 12C24 7.04 19.96 3 15 3ZM15 19C11.14 19 8 15.86 8 12C8 8.14 11.14 5 15 5C18.86 5 22 8.14 22 12C22 15.86 18.86 19 15 19Z" fill="#4B4A4E"/>
      </svg>

      <hr/>
      <post_block v-for="item in comments" :key="item.uid" :post="item" class="post-block"/>
    </div>
    <bottom_bar/>
    
  </div>
</template>

<script>
  import top_bar from '@/components/top_bar'
  import bottom_bar from '@/components/bottom_bar'
  import post_block from '@/components/post_block'
  import post_textarea   from '@/components/post_textarea'
  import axios from 'axios'

  export default {
    name: 'post',
    components: { top_bar, bottom_bar, post_block, post_textarea },
    data () {
      return {
        post:Object,
        comments:Array,
        comment_window_enable:false,
      }
    },
    created : function() {


      const config = { method: 'get', url: `https://post.mignon.chat/post/${this.$route.params.uid}`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }

      axios(config) .then( response => this.post=response.data)
      .catch( error =>  console.log(error) )
    },
    mounted: function(){
      this.load_comment()
    },
    methods : {
      load_comment:function(){
        let config = { method: 'get', url: `https://post.mignon.chat/post/${this.$route.params.uid}/comment`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
        axios(config).then( response => this.comments=response.data )
        .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )
      },
      comment: function() {
        this.comment_window_enable=true
      },
      send_comment: function(text) {
        if(msg.length!=0){
          const data = JSON.stringify({
            "uidUser": this.$root.keycloak.tokenParsed.user_id,
            "uidPost": this.post.uid,
            "text": text
          })
          let config = {
            method: 'post',
            url: 'https://post.mignon.chat/comment',
            headers: { 
              'Authorization': `Bearer ${this.$root.keycloak.token}`, 
              'Content-Type': 'application/json'
            },
            data : data
          }
          axios(config).then(response => this.load_comment())
          .catch(error => console.log(error))
        }
        this.comment_window_enable=false
      }
    },
    watch : {}
  }
</script>

<style scoped>
  .post-area {
    height: 74vh;
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

  .comment {
    position: absolute;
    top:30%;
    right:45%;
    transform: translateX(35%);
  }
</style>