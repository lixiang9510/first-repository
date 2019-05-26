
const express = require('express');
const UserModel = require('../models/user.js');

const router = express.Router();

router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
		return;
	}
})
router.get('/',(req,res)=>{
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})
router.get('/users',(req,res)=>{
	UserModel.find({},'-password -__v')
	.then(users=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users
		})	
	})
	
})

module.exports = router;