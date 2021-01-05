<template>
  <div class="bottom-bar">
      <span @click="$router.currentRoute.name!='home'?$router.push('home'):{}" class="icon">🏠</span>
      <span @click="$router.currentRoute.name!='post'?$router.push('post'):{}" class="icon">➕</span>
      <span class="icon">🔍</span>
  </div>
</template>

<script>

export default {
  name: 'bottom_bar',
  data () { return {} },
  created : function() {},
  mounted : function(){},
  methods : {},
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
}

.icon {
  max-height:70px;
}

</style>
