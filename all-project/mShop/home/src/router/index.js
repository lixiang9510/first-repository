

//引入模块
import Vue from 'vue';
import VueRouter from 'vue-router'

//引入页面组件
import Home from '../pages/Home/Home'
import Card from '../pages/Card/Card'
import Me from '../pages/Me/Me'

//声明使用
Vue.use(VueRouter)


//导出路由对象
export default new VueRouter({
	routes:[
		{path:"/home",component:Home},
		{path:"/card",component:Card},
		{path:"/me",component:Me},
		{path:"/",redirect:"/home"}
	]
})