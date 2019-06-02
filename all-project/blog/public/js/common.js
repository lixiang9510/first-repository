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
	var $articlePagination = $('#article-page');
	function buildArticleListHtml(articles){
		var html = '';
		articles.forEach(function(article){
			var createAt = moment(article.createAt).format('YYYY年MM月DD日 HH:mm:ss');
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
	function buildPaginationHtml(page,list){
		var html = '';
		html += `<li>
			      <a href="javascript:;" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			      </a>
			    </li>
			    `;
		list.forEach(function(i){
			if( i ==page ){
				html += `<li class="active"><a href="javascript:;">${ i }</a></li>`
			}else{
				html += `<li><a href="javascript:;">${ i }</a></li>`
			}
		})
		html += `<li>
			      <a href="javascript:;" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			      </a>
			    </li>
			    `;
		return html;
	}
	function buildCommentListHtml(comments){
		var html = '';
		console.log(comments);
		comments.forEach(function(comment){
			var createAt = moment(comment.createAt).format('YYYY年MM月DD日 HH:mm:ss');
			html +=	`<div class="panel panel-default">
			            <div class="panel-heading">${comment.user.username}评论于${ createAt }</div>
			            <div class="panel-body">
			             ${comment.content}
			            </div>
		          	</div>
					`
		})
		return html;
	}
	$articlePagination.on('get-data',function(ev,data){
		//构建文章列表
		$('#article-wrap').html(buildArticleListHtml(data.docs));
		//构建分页器
		var $pagination = $articlePagination.find('.pagination');

		if(data.pages > 1){
			$pagination.html(buildPaginationHtml(data.page,data.list))
		}else{
			$pagination.html('');
		}
	})
	$articlePagination.pagination({
		url:'/articles'
	})
	//评论评论列表分页
	var $commentPagination = $('#comment-page');
	$commentPagination.pagination({
		url:'/comment/list'
	})
	$commentPagination.on('get-data',function(ev,data){
		//构建分页列表
		$('#comment-wrap').html(buildCommentListHtml(data.docs));
		//构建分页器
		var $pagination = $commentPagination.find('.pagination');

		if(data.pages > 1){
			$pagination.html(buildPaginationHtml(data.page,data.list))
		}else{
			$pagination.html('');
		}
	})
})(jQuery);