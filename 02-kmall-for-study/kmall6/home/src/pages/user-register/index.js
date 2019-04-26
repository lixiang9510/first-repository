/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-23 20:23:38
*/
require ('pages/common/footer')
require ('pages/common/logo')

require('./index.css')
var _util = require('util')
var _user = require('service/user')
var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}
var page ={
	init:function(){
		this.bindEvent();

	},
	bindEvent:function(){
		var _this = this;
		$('[name=username]').on('blur',function(){
			var username = $(this).val();
			if(!_util.validate(username,'require')){
				return;
			}
			if(!_util.validate(username,'username')){
				return;
			}
			_user.checkUsername(username,function(){
				formErr.hide()
			},function(msg){
				formErr.show(msg)
			})
		})
		$('#btn-submit').on('click',function(){
			_this.submitRegister();
		})
		$('input').on('keyuo',function(ev){
			if(ev.keyCode == 13){
				_this.submitRegister();
			}
		})
	},
	submitLogin:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val()),
		}
		//2.验证
		var valodateResult = this.validate(formData)
		//3.发送
		if(valodateResult.status){//通过验证
			formErr.hide();
			_user.register(formData,function(){
				window.location.href = './result.html?type=register'
			},function(msg){
				formErr.show(msg)
			})
		}else{
			formErr.show(valodateResult.msg)
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空'
			return result;
		}
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式错误'
			return result;
		}
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空'
			return result;
		}
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确'
			return result;
		}
		if(formData.password != formData.repassword){
			result.msg = '两次密码不一致'
			return result;
		}
		if(!_util.validate(formData.phone,'require')){
			result.msg = '手机号码不能为空'
			return result;
		}
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号码格式不正确'
			return result;
		}
		if(!_util.validate(formData.email,'require')){
			result.msg = '邮箱不能为空'
			return result;
		}
		if(!_util.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确'
			return result;
		}
		result.status == true;
		return result
		
	}
}
$(function(){
	page.init();
})