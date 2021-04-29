// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import welcome from '@/pages/welcome'
import Router from 'vue-router'
import login from '@/pages/login'
//import * as Keycloak from 'keycloak-js'
//import router from '@/router'
import VueLogger from 'vuejs-logger'


Vue.config.productionTip = false


const options = {
  isEnabled: true,
  logLevel : Vue.config.productionTip  ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
}
Vue.use(VueLogger, options)


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'welcome', component: welcome },
    { path: '/:someroute', name: 'login', component: login },
  ]
})


new Vue({
  el: '#welcome',
  router,
  components: { welcome },
  template: '<router-view/>'
})


Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});


//keycloak init options
//https://keycloak.mignon.chat/auth/realms/posthoop/protocol/openid-connect/token

// let initOptions = {
//   url: 'https://keycloak.mignon.chat/auth', realm: 'posthoop', clientId: 'api', onLoad:'login-required'
// }
// let keycloak = Keycloak(initOptions)

// keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {
//   if(!auth)
//     window.location.reload()
//   else
//     Vue.$log.info("Authenticated")
//     // localStorage.setItem("vue-token", keycloak.token)
//     // localStorage.setItem("vue-refresh-token", keycloak.refreshToken)
//     new Vue({
//       el: '#app',
//       router,
//       components: { App },
//       template: '<App/>',
//       data:{user: {fullname: '', uid: 'FAKE_UID_USER'}, keycloak:keycloak},
//       render: h => h(App),
//     }).$mount('#app')

//     setInterval(() =>{
//       keycloak.updateToken(70).success((refreshed)=>{
//         if (refreshed) {
//           Vue.$log.debug('Token refreshed')
//         } else {
//           Vue.$log.warn('Token not refreshed, valid for '
//             + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
//         }
//       }).error(()=>{
//         Vue.$log.error('Failed to refresh token')
//       })


//     }, 60000)

//   }).error(() =>{
//     Vue.$log.error("Authenticated Failed")
//   })
