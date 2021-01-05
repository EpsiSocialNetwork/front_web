<template>
  <div>
    <top_bar/>
    <br/>
    <div>
      <textarea class="text-area" v-model="text" rows="8" placeholder="Votre post..." cols="45"></textarea>
      <br/>
      <button class="btn-primary" @click="submitMsg(text)">Envoyer</button>
    </div>
    <br/>
    <bottom_bar/> 
  </div>
</template>

<script>
import top_bar from '@/components/top_bar'
import bottom_bar from '@/components/bottom_bar'

export default {
  name: 'post',
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

      this.$router.push('/home')
    }
  },
  watch : {}
}
</script>

<style scoped>
  .text-area {
    resize: none;

  }
</style>