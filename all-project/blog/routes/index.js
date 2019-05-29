
const express = require('express');
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const router = express.Router();

async function getCommonData(req){
	const categoriesPromise = CategoryModel.find({},'name').sort({order:-1});
	const articlesPromise = ArticleModel.getPaginationArticles(req);
	const categories = await categoriesPromise;
	const articles = await articlesPromise;
	return {
		categories,
		articles
	}
}

//显示首页
router.get('/',(req,res)=>{
	/*
	CategoryModel.find({},'name')
	.sort({order:-1})
	.then(categories=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories
		})
	})
	*/
	getCommonData(req)
	.then(data=>{
		const { categories,articles } = data;
		res.render('main/index',{
			userInfo:req.userInfo,
			categories,
			articles:articles.docs,
			page:articles.page*1,
			pages:articles.pages,
			list:articles.list,
			url:'/article'
		})
	})
	
})
//处理首页分页ajax请求
router.get('/articles',(req,res)=>{
	ArticleModel.getPaginationArticles(req)
	.then(data=>{
		res.json({
			status:0,
			data
		})
	})
	
})
module.exports = router;