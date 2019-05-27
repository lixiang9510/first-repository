
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
	res.render('admin/category_add',{
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
		res.render('/admin/error');
	})
})
router.get('/edit/:id',(req,res)=>{
	cosnt { id } = req.params;
	CategoryModel.findById(id)
	.then(category=>{
		res.render()
	})
})
module.exports = router;