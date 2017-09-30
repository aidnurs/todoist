import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store/store'

Vue.use(Vuex)
window.Event=new Vue()

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
