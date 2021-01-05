<template>
  <div class="top-bar">
    <span @click="$router.push('/')"><logo class="logo"/></span>
    <img @click="$router.push($root.user.fullname)" v-if="$router.currentRoute.name!='profil'" class="icon-profil" src="https://picsum.photos/seed/picsum/128/128" width="60" height="60"/>
  </div>
</template>

<script>

import logo from '@/components/logo'
export default {
  name: 'top_bar',
  components: {logo},
  data () {
    return {}
  },
  created : function() {},
  mounted : function(){},
  methods : {},
  watch : {}
}
</script>

<style scoped>
.top-bar {
  background-color: var(--top-bg-color);
  display: flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-evenly;
  align-items:center;
  padding:15px;
}
.icon-profil {
  border-radius:50%;
}

.logo {
  max-height:70px;
}

</style>