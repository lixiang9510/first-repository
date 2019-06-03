
const express = require('express');
const CommentModel = require('../models/comment.js');

const router = express.Router();

//验证能否评论
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			status:10,
			message:'请先登陆账号'
		})
	}
})
//插入评论
router.post('/add',(req,res)=>{
	const { content,article } = req.body;
	//在此一拿到评论文章id为article
	CommentModel.insertMany({
		content,
		article,
		user:req.userInfo._id
	})
	.then(comments=>{
		CommentModel.getPaginationComments(req,{article})
		.then(data=>{
			res.json({
				status:0,
				data
			})
		})	
	})
})
//处理评论分页ajax请求
router.get('/list',(req,res)=>{
	const { id } = req.query;
	const query = {};
	if(id){
		query.article = id;
	}
	CommentModel.getPaginationComments(req,query)
	.then(data=>{
		res.json({
			status:0,
			data
		})
	})	
})
module.exports = router;