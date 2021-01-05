<template>
  <div>
    <h1>👋 Welcome on PostHoop</h1>
    <img src="@/assets/logo.svg"/>

    <button class="btn btn-primary element-lvl1" @click="$router.push('login')">Inscription</button>
    <button class="btn btn-primary element-lvl1" @click="$router.push('login')">Connexion</button>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {}
  },
  created : function() {

  },
  methods : {},
  watch : {}
}
</script>

<style scoped>
  img {
    margin: 10px 0 20px 0;
  }
</style>