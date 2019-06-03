
const express = require('express');
const multer = require('multer');
const upload = multer({dest:'public/uploads'})
const UserModel = require('../models/user.js');
const pagination = require('../util/pagination.js');
const CommentModel = require('../models/comment.js');
const hmac = require('../util/hmac.js');

const router = express.Router();

//登录验证
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.send('<h1>请登录账号</h1>')
		return;
	}
})
//显示后台首页
router.get('/',(req,res)=>{
	res.render('home/index',{
		userInfo:req.userInfo
	})
})
//显示用户列表
router.get('/users',(req,res)=>{
	/*
	let limit = 2;
	let { page } = req.query;
	if(isNaN(page)){
		page = 1;
	}
	if(page == 0 ){
		page = 1;
	}
	UserModel.countDocuments({})
	.then(count=>{
		
		const pages = Math.ceil(count / limit);
		if(page>pages){
			page = pages;
		}
		const list = [];
		for(let i=1;i<=pages;i++){
			list.push(i)
		}
		let skip = (page-1)*limit;
		UserModel.find({},'-password -__v')
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users,
				page:page*1,
				list
			})	
		})
	})
	*/
	const options = {
		page:req.query.page,
		model:UserModel,
		query:{},
		projection:'-password -__v',
		sort:{_id:1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page*1,
			list:data.list,
			pages:data.pages,
			url:'/admin/users'
		})	
	})
})
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	const uploadeFilePath = '/uploads/'+req.file.filename
	res.json({
		uploaded:true,
		url:uploadeFilePath
	})
})
router.get('/comments',(req,res)=>{
	CommentModel.getPaginationComments(req)
	.then(data=>{
		res.render('admin/comment_list',{
			userInfo:req.userInfo,
			comments:data.docs,
			page:data.page*1,
			pages:data.pages,
			list:data.list,
			url:'/admin/comments'
		})	
	})
})
//删除评论
router.get('/comment/delete/:id',(req,res)=>{
	const { id } = req.params;
	CommentModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除评论成功',
			url:'/admin/comments'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'删除评论失败',
			url:'javascript:window.history.back()'
		})
	})
})
//显示修改密码
router.get('/password',(req,res)=>{
	res.render('admin/password',{
		userInfo:req.userInfo
	})
})
//修改密码
router.post('/password',(req,res)=>{
	const { password } = req.body;
	UserModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
	.then(result=>{
		req.session.destroy();
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'更改密码成功',
			url:'/'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'更改密码失败',
			url:'javascript:window.history.back()'
		})
	})

})
module.exports = router;