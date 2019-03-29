
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
	name: {
		type:String,
		default:'Mark',
		maxlength:[5,"最多5位字符"],
		minlength:[3,"最小3位字符"]
	},
	age:{
		type:Number,
		required:[true,"年龄必须填写"],
		min:[10,"最小年龄是18"],
		max:[40,"最大年龄是40"]
	},
	major:{
		type:String,
		enum:["art","computer","sport","music"],
		default:"art"
	}
});
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;