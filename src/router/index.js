import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/pages/welcome'
import home from '@/pages/home'
import post from '@/pages/post'

import register from '@/pages/register'
import profil from '@/pages/profil'
import setting from '@/pages/setting'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: home },
    { path: '/home', name: 'home', component: home },
    { path: '/post/:uid', name: 'post', component: post },
    { path: '/setting', name: 'setting', component: setting },
    { path: '/register', name: 'register', component: register },
    { path: '/:fullname_user', name: 'profil', component: profil, props: true },
    //{ path: '/:fullname_user/friend', name: 'friend', component: friend },
  ]
})
