/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	//用户退出
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout'
		})
		.done((result)=>{
			if(result.status==0){
				// window.location.reload();
				window.location.href = '/';
			}
		})
		.fail((err)=>{
			$('#user-info .err').html('网络请求失败，请稍后再试');
		})
	})
})(jQuery);