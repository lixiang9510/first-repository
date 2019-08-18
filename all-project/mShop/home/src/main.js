



import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.css'
import 'font-awesome/css/font-awesome.min.css' 

Vue.config.productionTip = false
import store from './store'
import router from './router'
import filters from './filters'
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]))

new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app')
