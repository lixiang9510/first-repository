const mongoose = require('mongoose');
const pagination = require('../util/pagination.js')

const CommentSchema = new mongoose.Schema({
	content:{
		type:String
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	article:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Article'
	},
	createAt:{
		type:Date,
		default:Date.now()
	}
})
CommentSchema.statics.getPaginationComments=function(req,query={}){
	const options = {
		page:req.query.page,
		model:this,
		query:query,
		projection:'-__v',
		sort:{_id:-1},
		populates:[{path:'user',select:'username'},{path:'article',select:'title'}]
	}
	return pagination(options)
}
const CommentModel = mongoose.model('Comment',CommentSchema);

module.exports = CommentModel;