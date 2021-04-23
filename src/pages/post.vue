<template>
  <div>

      <top_bar/>
      <div class="post-area">
        <post_block :key="post.uid" :post="post" class="post-block"/>
        <br/>
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
import axios from 'axios'

export default {
  name: 'post',
  components: { top_bar, bottom_bar, post_block },
  data () {
    return {
      post:Object,
      comments:Array,
    }
  },
  created : function() {
    

    const config = { method: 'get', url: `https://post.mignon.chat/post/${this.$route.params.uid}`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }

    axios(config) .then( response => this.post=response.data)
    .catch( error =>  console.log(error) )
  },
  mounted: function(){
    let config = { method: 'get', url: `https://post.mignon.chat/post/${this.$route.params.uid}/comment`, headers: {  'Authorization': `Bearer ${  this.$root.keycloak.token}` } }
    axios(config).then( response => this.comments=response.data )
    .catch( error =>  console.error(`Error during GET profile for uid_user : ${this.post.uidUser}\n${error}`) )

  },
  methods : {
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
    cursor: pointer;
  }
  .post-block:hover {
    background-color: #EEEEEE
  }
</style>