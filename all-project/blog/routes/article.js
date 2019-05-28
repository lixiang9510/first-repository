
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
	const options = {
		page:req.query.page,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:-1}
	}
	pagination(options)
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
		res.render('admin/article_add',{
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

//编辑分类
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.findById(id)
	.then(category=>{	
		res.render('admin/category_add_edit',{
			userInfo:req.userInfo,
			category
		})
	})
	.catch(err=>{
		throw err;
	})
})
//处理编辑分类
router.post('/edit',(req,res)=>{
	const { id,name,order } = req.body;
	CategoryModel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){//没有修改
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'修改分类失败，分类已存在',
				url:'javascript:window.history.back()'
			})
		}else{
			CategoryModel.findOne({name:name,_id:{$ne:id}})
			.then(newCategory=>{
				if(newCategory){//已有同名分类
					res.render('admin/error',{
						userInfo:req.userInfo,
						message:'修改分类失败，已有同名分类',
						url:'javascript:window.history.back()'
					})
				}else{
					CategoryModel.updateOne({_id:id},{name,order})
					.then(result=>{
						res.render('admin/success',{
							userInfo:req.userInfo,
							message:'修改分类成功',
							url:'/category'
						})
					})
					.catch(err=>{
						throw err;
					})
				}
			})
			.catch(err=>{
				throw err;
			})	
		}
	})
	.catch(err=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'添加失败，操作数据库错误，请稍后再试',
			url:'javascript:window.history.back()'
		})
	})
})
//删除分类
router.get('/delete/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除分类成功',
			url:'/category'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'删除分类失败',
			url:'javascript:window.history.back()'
		})
	})
})
module.exports = router;