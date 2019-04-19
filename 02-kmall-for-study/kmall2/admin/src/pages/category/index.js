import React,{ Component } from 'react';
import { Route,Switch } from "react-router-dom";
import CategoryAdd from './add.js'
import CategoryList from './list.js'
//在此做路由的分发
class Category extends Component{
	render(){
		return (
			<Switch>
				<Route path='/category/add' component={CategoryAdd} />
				<Route path='/category/' component={CategoryList} />
				
			</Switch>
		)
	}
}
export default Category