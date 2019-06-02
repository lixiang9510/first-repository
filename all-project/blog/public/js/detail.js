/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	$('.btn-sub-comment').on('click',function(){
		var content = $('#comment-content').val().trim();
		var $err = $('.err');
		var id = $(this).data('id');
		//在此已拿到需要查看详情得文章id
		if(!content){
			$err.html('请输入评论内容');
			return false;
		}else if(content.length > 20){
			$err.html('最多输入二十个字符');
			return false;
		}else{
			$err.html('');
			$.ajax({
				url:'/comment/add',
				type:'post',
				dataType:'json',
				data:{
					content:content,
					article:id
				}
				
			})
			.done(function(result){
				$('#comment-content').val('');
				console.log(result)
			})
			.fail(function(err){
				console.log(err)
			})
		}
	})
})(jQuery);