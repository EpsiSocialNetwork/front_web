import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/pages/welcome'
import home from '@/pages/home'
import post from '@/pages/post'
import login from '@/pages/login'
import profil from '@/pages/profil'
import setting from '@/pages/setting'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/home', name: 'home', component: home },
    { path: '/post/:uid', name: 'post', component: post },
    { path: '/setting', name: 'setting', component: setting },
    { path: '/:fullname_user', name: 'profil', component: profil },
    { path: '/', name: 'welcome', component: welcome },
    //{ path: '/register', name: 'register', component: register },
    //{ path: '/:fullname_user/friend', name: 'friend', component: friend },
  ]
})
