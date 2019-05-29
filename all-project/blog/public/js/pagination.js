/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	$.fn.extend({
		pagination:function(options){
			var $elem = $(this);
			$elem.on('click','a',function(){
				var $this = $(this);
				var page = 1;
				var currentPage = $elem.find('.active a').html();
				var labalAttr = $this.attr('aria-label');
				if(labalAttr == 'Next'){
					page = currentPage*1+1;
				}else if(labalAttr == 'Previous'){
					page = currentPage-1;
				}else{
					page = $this.html();
				}
				if(page == currentPage){
					return false;
				}
				//发送ajax请求
				$.ajax({
					url:options.url+"?page="+page,
					dataType:'json'
				})
				.done(function(result){
					$elem.trigger('get-data',result.data)
				})
				.fail(function(err){
					console.log(err);
				})
			})
		}
	})
})(jQuery);