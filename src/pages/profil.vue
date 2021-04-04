<template>
  <div>
    <top_bar/>
    <div class="profil">
    <div class="user-picture">
      <img class="edit" src="@/assets/edit.svg"/>
      
      <img class="icon-profil" src="https://picsum.photos/seed/picsum/128/128" width="80" height="80"/>
      
      <img class="trash" src="@/assets/trash.svg"/>
      
    </div>
    <div class="info-user">
      <span class="info-user_fullname"><b>{{fullname_user}}</b></span>
      <span class="info-user_email">here.sample@email.com</span>
      <div class="stat-activity">
        <span>67 abonnés - 98 abonnements</span>
        <br/>
        <span>24 posts</span>
      </div>
    </div>
    <hr/>

    <button class="btn btn-raise element-lvl1 deconnection" @click="$router.push('/')">
      Déconnexion
    </button>
    <!-- <img src="@/assets/illustration.svg" /> -->
    </div>
    <bottom_bar/> 
  </div>
</template>

<script>
import top_bar from '@/components/top_bar'
import bottom_bar from '@/components/bottom_bar'

export default {
  name: 'profil',
  components: { top_bar, bottom_bar },
  data () {
    return {
      fullname_user : this.$route.params.fullname_user
    }
  },
  created : function() {

  },
  methods : {},
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