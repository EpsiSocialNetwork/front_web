<template>
  <div>
    <top_bar/>
      <my_profil v-if="$root.keycloak.tokenParsed.name.replace(' ','_')==$route.params.fullname_user"/>
      <show_profil v-else/>

    <bottom_bar/> 
  </div>
</template>

<script>
import top_bar from '@/components/top_bar'
import bottom_bar from '@/components/bottom_bar'
import my_profil from '@/components/my_profil'
import show_profil from '@/components/show_profil'
import axios from 'axios'

export default {
  name: 'profil',
  components: { top_bar, bottom_bar,my_profil,show_profil },
  data () {
    return {}
  },
  created : function() {
    
  },
  methods : {
  },
  watch : {}
}
</script>

<style scoped>
.trash{
  border: 1px solid #FF003D;
  border-radius: 50%;
  padding:15px;
}
.edit{
  border: 1px solid #210966;
  border-radius: 50%;
  padding:15px;
}
.deconnection {
  background-color: #FF003D;
}
.info-user_email {
  margin-top:15px;
}
.info-user_fullname {
  margin-top:15px;
}
.stat-activity {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin-top:15px;
}

.user-picture {
  display: flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:center;
  align-items:center;
  margin-top: 10px;
  
}
.profil{
  height:75vh;
}
.user-picture img {
  margin: 0 50px;
}

.info-user {
  display:flex;
  flex-direction:column;
  flex-wrap:nowrap;
  margin-top:10px;
}

.icon-profil {
  border-radius:50%;
}


</style>