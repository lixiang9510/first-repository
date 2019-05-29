const mongoose = require('mongoose');
const pagination = require('../util/pagination.js')

const ArticleSchema = new mongoose.Schema({
	title:{
		type:String
	},
	introduction:{
		type:String
	},
	content:{
		type:String
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Category'
	},
	click:{
		type:Number,
		default:0
	},
	createAt:{
		type:Date,
		default:Date.now()
	}
})
ArticleSchema.statics.getPaginationArticles=function(req,query={}){
	const options = {
		page:req.query.page,
		model:this,
		query:query,
		projection:'-__v',
		sort:{_id:-1},
		populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
	}
	return pagination(options)
}
const ArticleModel = mongoose.model('Article',ArticleSchema);

module.exports = ArticleModel;