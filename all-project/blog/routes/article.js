
const express = require('express');
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const pagination = require('../util/pagination.js')

const router = express.Router();

router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
	}
})
//显示文章列表
router.get('/',(req,res)=>{
	/*
	const options = {
		page:req.query.page,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:-1},
		populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
	}
	pagination(options)
	.then(data=>{
		console.log(data.docs)
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page*1,
			pages:data.pages,
			list:data.list,
			url:'/article'
		})	
	})
	*/
	ArticleModel.getPaginationArticles(req)
	.then(data=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page*1,
			pages:data.pages,
			list:data.list,
			url:'/article'
		})	
	})
})
//添加文章页面
router.get('/add',(req,res)=>{
	CategoryModel.find({},'name')
	.sort({order:-1})
	.then(categories=>{
		res.render('admin/article_add_edit',{
			userInfo:req.userInfo,
			categories
		})
	})
	
})
//处理添加文章
router.post('/add',(req,res)=>{
	const { category,title,introduction,content } = req.body;
	ArticleModel.insertMany({
		category,
		title,
		introduction,
		content,
		user:req.userInfo._id
	})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'添加文章成功',
			url:'/article'
		})		
	})
	.catch(err=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'添加文章失败，操作数据库错误，请稍后再试',
			url:'javascript:window.history.back()'
		})
	})
})

//显示编辑文章页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.find({},'name')
	.sort({order:-1})
	.then(categories=>{
		ArticleModel.findById(id)
		.then(article=>{	
			res.render('admin/article_add_edit',{
				userInfo:req.userInfo,
				article,
				categories
			})
		})
	})
})
//查看文章
router.get('/see/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.find({},'name')
	.sort({order:-1})
	.then(categories=>{
		ArticleModel.findById(id)
		.then(article=>{	
			res.render('admin/article_see',{
				userInfo:req.userInfo,
				article,
				categories
			})
		})
	})
})
//处理编辑文章
router.post('/edit',(req,res)=>{
	const { id,category,title,introduction,content } = req.body;
	ArticleModel.updateOne({_id:id},{ category,title,introduction,content })
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"修改文章成功",
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'修改文章失败，操作数据库错误，请稍后再试',
			url:'javascript:window.history.back()'
		})
	})
})
//删除文章
router.get('/delete/:id',(req,res)=>{
	const { id } = req.params;
	ArticleModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除文章成功',
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'删除文章失败',
			url:'javascript:window.history.back()'
		})
	})
})
module.exports = router;