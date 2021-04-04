<template>
  <div>
    <top_bar/>

    <div id="infinite-list" class="post-area">
      <post_block v-for="item in items" key="" class="post-block"/>
    </div>

    <bottom_bar/> 
  </div>
</template>

<script>
import top_bar from '@/components/top_bar'
import bottom_bar from '@/components/bottom_bar'
import post_block from '@/components/post_block'
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
    loadMore () {
      /** This is only for this demo, you could 
        * replace the following with code to hit 
        * an endpoint to pull in more data. **/
      this.loading = true;
      setTimeout(e => {
        for (var i = 0; i < 20; i++) {
          this.items.push('');
        }
        this.loading = false;
      }, 50);
      /**************************************/
      
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
    cursor: pointer;
  }
  .post-block:hover {
    background-color: #EEEEEE
  }
</style>