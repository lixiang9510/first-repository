/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:18
*/
import * as types from './actionTypes.js'
import axios from 'axios';
import { message } from 'antd';

const getLoginRequestAction = () =>{
	return {
		type:types.LOGIN_REQUEST	
	}
}
const getLoginDoneAction = () =>{
	return {
		type:types.LOGIN_DONE
	}
}
export const getLoginAction = (values)=>{
	return (dispatch)=>{
		dispatch(getLoginRequestAction());
		axios({
			methed:'post',
			url:'http://127.0.0.1:3000/admin/login',
			data:values
		})
		.then(result=>{
			console.log(result)
			if(result.data.code == 0){
				console.log(222);
				window.location.href = '/'
			}else if(result.data.code == 1){
				console.log(2333);
				message.error(result.data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('网络请求失败，请稍后重试')
		})
		.finally(()=>{
			dispatch(getLoginDoneAction());
		})
	}
}


