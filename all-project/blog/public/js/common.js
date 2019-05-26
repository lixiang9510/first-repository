/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	var $login = $('#login');
	var $register = $('#register');
	$('#go-register').on('click',function(){
		$login.hide();
		$register.show();
	})
	$('#go-login').on('click',function(){
		$register.hide();
		$login.show();
	})
	var usernameReg = /^[a-z][a-z0-9_]{2,9}$/i;
	var passwordReg = /^\w{3,6}$/;
	//用户注册
	$('#sub-register').on('click',function(){
		var $err = $register.find('.err');
		var errMsg = '';
		var username = $register.find('[name="username"]').val();
		var password = $register.find('[name="password"]').val();
		var repassword = $register.find('[name="repassword"]').val();
		if(!usernameReg.test(username)){
			errMsg = '用户名格式不正确';
		}
		else if(!passwordReg.test(password)){
			errMsg = '密码格式不正确';
		}
		else if(password != repassword){
			errMsg = '两次密码不一致';
		}
		if(errMsg){
			$err.html(errMsg);
			return;
		}else{
			$err.html('')
			$.ajax({
				url:'/user/register',
				type:'post',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				if(result.status==0){
					$('#go-login').trigger('click');

				}else{
					$err.html(result.message)
				}
			})
			.fail(function(err){
				$err.html('网络请求失败，请稍后再试')
			})
		}
	})
	//用户登录
	$('#sub-login').on('click',function(){
		var $err = $login.find('.err');
		var errMsg = '';
		var username = $login.find('[name="username"]').val();
		var password = $login.find('[name="password"]').val();
		if(!usernameReg.test(username)){
			errMsg = '用户名格式不正确';
		}
		else if(!passwordReg.test(password)){
			errMsg = '密码格式不正确';
		}
		if(errMsg){
			$err.html(errMsg);
			return;
		}else{
			$err.html('')
			$.ajax({
				url:'/user/login',
				type:'post',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				if(result.status==0){
					/*
					$login.hide();
					$('#user-info span').html(result.data.username);
					$('#user-info').show();
					*/
					window.location.reload();
				}else{
					$err.html(result.message)
				}
			})
			.fail(function(err){
				$err.html('网络请求失败，请稍后再试')
			})
		}
	})
	
})(jQuery);