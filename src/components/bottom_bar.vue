<template>
  <div class="bottom-bar">
      <post class="post" v-if="post_window_enable" v-on:send="send"/>
      <span @click="$router.currentRoute.name!='home'?$router.push('/home'):{}" class="icon">🏠</span>
      <span @click="new_post()" class="icon">➕</span>
      <span class="icon">🔍</span>
  </div>
</template>

<script>
import post from '@/components/post'
import axios from 'axios'

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
      if(msg.length!=0){
        let data = JSON.stringify({"uidUser":this.$root.user.uid,"text":msg});
        let config = {
          method: 'post',
          url: 'https://post.mignon.chat/post',
          headers: { 
            'Authorization': `Bearer ${this.$root.keycloak.token}`, 
            'Content-Type': 'application/json'
          },
          data : data
        }


        axios(config).then(response => console.log(JSON.stringify(response.data)))
        .catch(error => console.log(error))
      }
      console.log("---")
      console.log(this.$root.keycloak.token)
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
