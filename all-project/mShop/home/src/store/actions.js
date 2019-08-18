


import {
	GET_HOME_PRODUCTS
} from './types.js'
import{
	getHomeProducts
} from '../api'


export default {
	async [GET_HOME_PRODUCTS]({commit}){
		const products = await getHomeProducts()
		commit(GET_HOME_PRODUCTS,{homeProducts:products})
	}
}