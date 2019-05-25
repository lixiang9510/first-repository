
const express = require('express');
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js');
const router = express.Router();

//用户注册
router.post('/register',(req,res)=>{
	const { username,password } = req.body;
	const result = {
		status:0,
		message:''
	}
	UserModel.findOne({username})
	.then(user=>{
		if(user){//用户已存在
			result.status = 10;
			result.message = '用户已存在'
			res.json(result);
		}else{
			UserModel.insertMany({
				username,
				password
			})
			.then(user=>{
				result.data = user;
				res.json(result);
			})
			.catch(err=>{
				throw err;
			})
		}
	})
	.catch(err=>{
		result.status = 10;
		result.message = '服务器端错误，请稍后重试111';
		res.json(result);
	})
})
//用户注册
router.post('/login',(req,res)=>{
	const { username,password } = req.body;
	const result = {
		status:0,
		message:''
	}
	UserModel.findOne({username,password},'-password -__v')
	.then(user=>{
		if(user){//用户存在
			result.data = user;
			req.cookies.set('userInfo',JSON.stringify(user));//转化为字符串
			res.json(result);
		}else{
			result.status = 10;
			result.message = '用户名或者密码不正确'
			res.json(result)
		}
	})
	.catch(err=>{
		result.status = 10;
		result.message = '服务器端错误，请稍后重试111';
		res.json(result);
	})
})	
module.exports = router;