



require ('./index.css')
var _user = require('service/user')

var nav = {
	init:function(){
		this.bindEvent();
		return this;
	},
	bindEvent:function(){
		//绑定退出事件
		$('#logout').on('click',function(){
			_user.logout(function(result){
				console.log('result')
			},function(message){
				console.log(message)
			})
		})
	}
}
module.exports = nav.init()