<template>
  <div>
    <top_bar/>

    <div id="infinite-list" class="post-area">
      <post_block v-for="item in items" :key="item.uid" :post="item" class="post-block"/>
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
        items: []
      }
    },
    created : function() {
    // Get first post
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
    reload_after_send_post(){
      const config = { method: 'get', url: 'http://post.mignon.chat/post', headers: {  'Authorization': `Bearer ${this.$root.keycloak.token}` } }

      axios(config) .then( response => this.items=response.data.reverse())
      .catch( error =>  console.log(error) )  
    },
    loadMore () {

      /*
      this.loading = true;
      setTimeout(e => {
        for (var i = 0; i < 20; i++) {
          this.items.push('');
        }
        this.loading = false;
      }, 50);
      */
      
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