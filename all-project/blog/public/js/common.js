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
	//文章分页
	var $articlePagination = $('#article-list');

	function buildArticleListHtml(articles){
		var html = '';
		articles.forEach(function(article){
			var createAt = moment(article.createAt).format('YYYY年MM月DD日 H:m:i')
			html += `<div class="panel panel-default content-item">
				      <div class="panel-heading">
				        <h3 class="panel-title">
				          <a href="/view/${article._id.toString()}" class="link" target="_blank">${article.title}</a>
				        </h3>
				      </div>
				      <div class="panel-body">
				       ${article.introduction}
				      </div>
				      <div class="panel-footer">
				        <span class="glyphicon glyphicon-user"></span>
				        <span class="panel-footer-text text-muted">${article.user.username}</span>
				        <span class="glyphicon glyphicon-th-list"></span>
				        <span class="panel-footer-text text-muted">${article.category.name}</span>
				        <span class="glyphicon glyphicon-time"></span>
				        <span class="panel-footer-text text-muted">${createAt}</span>
				        <span class="glyphicon glyphicon-eye-open"></span>
				        <span class="panel-footer-text text-muted"><em>${article.click}</em>已阅读</span>
				      </div>
    				</div>
					`
		})




		return html;
	}

	$articlePagination.on('get-data',function(ev,data){
		$('#article-wrap').html(buildArticleListHtml(data.docs))
	})
	$articlePagination.pagination({
		url:'/articles'
	})
})(jQuery);