<template>
  <div>
    <top_bar/> 
    <div class="user-picture">
      <span>✏</span>
      <span><img class="icon-profil" src="https://picsum.photos/seed/picsum/128/128" width="80" height="80"/></span>
      <span>🗑</span>
    </div>
    <div class="info-user">
      <span class="info-user_fullname">{{fullname_user}}</span>
      <span class="info-user_email">EMAIL HERE</span>
      <div class="stat-activity">
        <span>67 abonnés - 98 abonnements</span>
        <br/>
        <span>24 posts</span>
      </div>
    </div>
    <hr/>

    <button class="btn btn-raise element-lvl1 deconnection" @click="$router.push('/')">Déconnexion</button>
    <img src="@/assets/illustration.svg" />
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
  justify-content:space-evenly;
  align-items:center;
  margin-top: 10px;
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