<template>
  <div class="post_textarea">

    <div class="window">
      <span class="close_cross" @click="submitMsg('')">X</span>
      <textarea class="text-area" v-model="text" rows="8" placeholder="Votre post..." cols="45"></textarea>
      <br/>
      <button class="btn-primary" @click="submitMsg(text)">Envoyer</button>
    </div>
  </div>
</template>

<script>
import top_bar from '@/components/top_bar'
import bottom_bar from '@/components/bottom_bar'

export default {
  name: 'post_textarea',
  components: { top_bar, bottom_bar },
  data () {
    return {
      text:''
    }
  },
  created : function() {

  },
  mounted: function(){ },
  methods : { 
    submitMsg: function(text) {
      this.$emit('send', text)
    }
  },
  watch : {}
}
</script>

<style scoped>
  .text-area {
    resize: none;
  }
  .window {
    position:relative;
  }
  .close_cross{
    position: absolute;
    top:15px;
    right:15px;
  }
  .close_cross:hover{
    color:red;
    background-color:#EEEEEE;
  }
</style>