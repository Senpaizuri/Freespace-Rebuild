import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import * as store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  router,
  store:new Vuex.Store(store),
  render: h => h(App)
}).$mount('#app')
