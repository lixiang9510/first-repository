/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-15 18:54:39
*/

import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Card,Col,Row } from 'antd';
import { actionCreator } from './store'
import { Layout } from 'common/layout'
	

class Home extends Component{
	componentDidMount(){
		this.props.handleCount();
	}
    render(){
    	const {usernum,productnum,ordernum}=this.pros;
        return (
        	<div className='Home'>
        		 <Row>
			      <Col span={8}>
			      	<Card title="用户数量" bordered={false}>111</Card>
			      </Col>
			      <Col span={8}>
			      	<Card title="商品数量" bordered={false}>111</Card>
			      </Col>
			      <Col span={8}>
			      	<Card title="购买数量" bordered={false}>111</Card>
			      </Col>
			    </Row>
        	</div>
        	
        )
    }
}
const mapStateToProps = (state)=>{
	return {
		usernum:state.get('home').get('usernum'),
		productnum:state.get('home').get('productnum'),
		ordernum:state.get('home').get('ordernum')
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		handleCount:()=>{
			const action = actionCreator.getCountAction()
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)