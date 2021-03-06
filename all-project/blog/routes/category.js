
const express = require('express');
const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js')

const router = express.Router();

router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
	}
})
//显示分类列表
router.get('/',(req,res)=>{
	const options = {
		page:req.query.page,
		model:CategoryModel,
		query:{},
		projection:'-__v',
		sort:{order:1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			categories:data.docs,
			page:data.page*1,
			pages:data.pages,
			list:data.list,
			url:'/category'
		})	
	})
})
//添加分类页面
router.get('/add',(req,res)=>{
	res.render('admin/category_add_edit',{
		userInfo:req.userInfo
	})
})
//处理添加分类
router.post('/add',(req,res)=>{
	const { name,order } = req.body;
	CategoryModel.findOne({name})
	.then(category=>{
		if(category){//已经存在该分类
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'已有同名分类，添加分类失败'
			})
		}else{
			CategoryModel.insertMany({name,order})
			.then(categories=>{
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:"添加分类成功",
					url:'/category'
				})
			})
			.catch(err=>{
				throw err;
			})
		}
	})
	.catch(err=>{
		res.render('/admin/error',{
			userInfo:req.userInfo,
			message:'操作数据库错误，请稍后再试'
		});
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