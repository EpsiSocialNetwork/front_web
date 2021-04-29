<template>
  <div>
    <top_bar/>

    <div id="infinite-list" class="post-area">
      <post_block v-for="item in items_show" :key="item.uid" :post="item" class="post-block" @reload_after_send_post="reload_after_send_post"/>
    </div>

    <bottom_bar @reload_after_send_post="reload_after_send_post"/> 
  </div>
</template>

<script>
  import top_bar from '@/components/top_bar'
  import bottom_bar from '@/components/bottom_bar'
  import post_block from '@/components/post_block'
  import axios from 'axios'

  export default {
    name: 'home',
    components: { top_bar, bottom_bar, post_block },
    data () {
      return {
        loading: false,
        items: [],
        items_show: [],
        tab: [],
        following_user_uid: []
      }
    },
    created : async function() {
    // Get first post
    await this.get_following_user_uid()
    this.reload_after_send_post()
    
  },
  mounted: function(){

    // Detect when scrolled to bottom.
    const listElm = document.querySelector('#infinite-list')
    listElm.addEventListener('scroll', e => {
      let scrollHeightMax = listElm.scrollTop + listElm.clientHeight
      if(scrollHeightMax+listElm.scrollHeight/25 >= listElm.scrollHeight) {
        this.loadMore()
      }
    })
    // Initially load some items.
    this.loadMore()
  },
  methods : {
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    get_following_user_uid:async function(){      
      const config = { method: 'get', url: `https://user.mignon.chat/user/${this.$root.keycloak.tokenParsed.user_id}/follow`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      await axios(config) .then( response => this.following_user_uid=response.data)
      .catch( error =>  console.log(error) )
    },
    async reload_after_send_post(){
      let config = { method: 'get', url: `https://post.mignon.chat/post/timeline/user?uids=${[this.$root.keycloak.tokenParsed.user_id,...this.following_user_uid.map(e=>e.followUidUser)].join`,`}`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      await axios(config) .then( response => this.items=response.data )
      .catch( error =>  console.log(error) )

      config = { method: 'get', url: `https://post.mignon.chat/post/`, headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }
      axios(config) .then( response => {
        

        this.tab = this.shuffle(response.data).filter(e=>this.items.reduce((r,v)=>v.uid==e.uid?r=false:r=r,true))

        const splice_index = this.items.length<10?10:this.items.length>this.tab.length?(this.tab.length-1)/2:(this.items.length-1)/2

        this.items=[...this.items,...this.tab.slice(0,splice_index)].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))


        this.items_show=[]
        this.loadMore()
      }).catch( error =>  console.log(error) )
    },
    loadMore () {
      this.loading = true;
      this.items.splice(0,10).map(e=>this.items_show.push(e))
      this.loading = false;
    }
  },
  watch : {}
}
</script>

<style scoped>

  .post-area {
    height: 78vh;
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
    max-width:75%;
    min-width:40%;
    padding: 5px;
    margin: 0 auto 25px auto;
  }
  .post-block:hover {
    background-color: #F9F9F9
  }
</style>