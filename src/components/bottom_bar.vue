<template>
  <div class="bottom-bar">
      <post_textarea class="post" v-if="post_window_enable" v-on:send="send"/>
      <span @click="$router.currentRoute.name!='home'?$router.push('/home'):{}" class="icon">🏠</span>
      <span @click="new_post()" class="icon">➕</span>
      
  </div>
</template>

<script>
import post_textarea from '@/components/post_textarea'
import axios from 'axios'

export default {
  name: 'bottom_bar',
  components: { post_textarea },
  data () { return {post_window_enable:false,} },
  created : function() {},
  mounted : function(){},
  methods : {
    new_post:function(){
      this.post_window_enable=true
    },
    send:function(msg) {
      //TODO post message to api
      new Audio(require('@/assets/discord-notification.mp3')).play()
      if(msg.length!=0){

        let data = JSON.stringify({"uidUser":this.$root.keycloak.tokenParsed.user_id,"text":msg});
        let config = {
          method: 'post',
          url: 'https://post.mignon.chat/post',
          headers: { 
            'Authorization': `Bearer ${this.$root.keycloak.token}`, 
            'Content-Type': 'application/json'
          },
          data : data
        }
        axios(config).then(response => this.$emit('reload_after_send_post'))
        .catch(error => console.log(error))

        
      }
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
  max-height:90px;
  cursor: pointer;
  font-size: 30px;
}
.post {
  position: absolute;
  top:30%;
  right:45%;
  transform: translateX(35%);
}
</style>
