<template>
  <div class="bottom-bar">
      <post class="post" v-if="post_window_enable" v-on:send="send"/>
      <span @click="$router.currentRoute.name!='home'?$router.push('home'):{}" class="icon">🏠</span>
      <span @click="new_post()" class="icon">➕</span>
      <span class="icon">🔍</span>
  </div>
</template>

<script>
import post from '@/components/post'
export default {
  name: 'bottom_bar',
  components: { post },
  data () { return {post_window_enable:false,} },
  created : function() {},
  mounted : function(){},
  methods : {
    new_post:function(){
      this.post_window_enable=true
    },
    send:function(msg) {
      //TODO post message to api
      
      this.post_window_enable=false
    }
  },
  watch : {}
}
</script>

<style scoped>
.bottom-bar {
  background-color: var(--bottom-bg-color);
  display: flex;
  flex-direction: row;
  flex-wrap:nowrap;
  justify-content:space-evenly;
  padding:15px;
  height:4.5vh;
}

.icon {
  max-height:70px;
}
.post {
  position: absolute;
  top:30%;
  right:45%;
  transform: translateX(35%);
}
</style>
