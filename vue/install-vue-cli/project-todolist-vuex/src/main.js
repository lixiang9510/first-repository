import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.css'
Vue.config.productionTip = false
import store from './store'
new Vue({
	store,
  render: h => h(App),
}).$mount('#app')
