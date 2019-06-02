
const express = require('express');
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const CommentModel = require('../models/comment.js');
const router = express.Router();

async function getCommonData(){
	const categoriesPromise = CategoryModel.find({},'name').sort({order:-1});
	const topArticlesPromise = ArticleModel.find({},'_id click title').sort({click:-1}).limit(10);
	const categories = await categoriesPromise;
	const topArticles = await topArticlesPromise;
	return {
		categories,
		topArticles
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
	getCommonData()
	.then(data=>{
		const { categories,topArticles } = data;
		ArticleModel.getPaginationArticles(req)
		.then(pageArticles=>{
			res.render('main/index',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				articles:pageArticles.docs,
				page:pageArticles.page*1,
				pages:pageArticles.pages,
				list:pageArticles.list,
				url:'/article'
			})	
		})
		
	})
})
//处理首页分页ajax请求
router.get('/articles',(req,res)=>{
	const { id } = req.query;
	const query = {};
	if(id){
		query.category = id;
	}
	ArticleModel.getPaginationArticles(req,query)
	.then(data=>{
		res.json({
			status:0,
			data
		})
	})	
})


//函数，为了获取评论数据
async function getDetailData(req){
	//获取得是分类id
	const {id} = req.params;
	const commonDataPromise = getCommonData();
	const ArticleDataPromise = ArticleModel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
								.populate({path:'user',select:'username'})
								.populate({path:'category',select:'name'});
	const commentPageDataPromise = CommentModel.getPaginationComments(req)							
	const data = await commonDataPromise;
	const article = await ArticleDataPromise;
	const pageData = await commentPageDataPromise;
	const { categories,topArticles } = data;
	return {
		categories,
		topArticles,
		article,
		pageData
	}
}

//详情页
router.get('/view/:id',(req,res)=>{
	//要得到一个id，为所查看文章得id
	getDetailData(req)
	.then(data=>{
		const { categories,topArticles,article,pageData } = data;
		res.render('main/detail',{
			userInfo:req.userInfo,
			categories,
			topArticles,
			article,
			//回传id,为了能选中相应得详情页
			category:article.category._id,
			//返回详情页评论分页数据
			comments:pageData.docs,
			page:pageData.page*1,
			pages:pageData.pages,
			list:pageData.list,
		})	
	})
})
//列表页
router.get('/list/:id',(req,res)=>{
	const {id} = req.params;
	getCommonData()
	.then(data=>{
		const { categories,topArticles } = data;
		ArticleModel.getPaginationArticles(req,{category:id})
		.then(pageArticles=>{
			res.render('main/list',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				articles:pageArticles.docs,
				page:pageArticles.page*1,
				pages:pageArticles.pages,
				list:pageArticles.list,
				//回传id
				category:id
			})	
		})
	})
})
module.exports = router;