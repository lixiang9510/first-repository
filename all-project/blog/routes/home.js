
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
//显示个人中心首页
router.get('/',(req,res)=>{
	res.render('home/index',{
		userInfo:req.userInfo
	})
})
router.get('/comments',(req,res)=>{
	CommentModel.getPaginationComments(req,{user:req.userInfo._id})
	.then(data=>{
		res.render('home/comment_list',{
			userInfo:req.userInfo,
			comments:data.docs,
			page:data.page*1,
			pages:data.pages,
			list:data.list,
			url:'/home/comments'
		})	
	})
})
//删除评论
router.get('/comment/delete/:id',(req,res)=>{
	const { id } = req.params;
	CommentModel.deleteOne({_id:id,user:req.userInfo._id})
	.then(result=>{
		res.render('home/success',{
			userInfo:req.userInfo,
			message:'删除评论成功',
			url:'/home/comments'
		})
	})
	.catch(err=>{
		res.render('home/error',{
			userInfo:req.userInfo,
			message:'删除评论失败',
			url:'javascript:window.history.back()'
		})
	})
})
//显示修改密码
router.get('/password',(req,res)=>{
	res.render('home/password',{
		userInfo:req.userInfo
	})
})
//修改密码
router.post('/password',(req,res)=>{
	const { password } = req.body;
	UserModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
	.then(result=>{
		req.session.destroy();
		res.render('home/success',{
			userInfo:req.userInfo,
			message:'更改密码成功',
			url:'/'
		})
	})
	.catch(err=>{
		res.render('home/error',{
			userInfo:req.userInfo,
			message:'更改密码失败',
			url:'javascript:window.history.back()'
		})
	})

})
module.exports = router;