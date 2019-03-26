/*
* @Author: Tom
* @Date:   2018-07-25 14:33:24
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-24 17:30:14
*/

(function($){
	function getRandom(min,max) {	
		return Math.round(min + (max-min)*Math.random());
	}
	var $wish = $('.wish');
	var $wall = $('.wall');
	var wishWidth = $wish.width(),
		wishHeight = $wish.height(),
		wallWidth = $wall.width(),
		wallHeight = $wall.height();
	$wish.pep({  constrainTo: '.wall'});
	$wish.each(function(){
		let x = getRandom(0,wallWidth-wishWidth);
		let y = getRandom(0,wallHeight-wishHeight);
		$(this).css({
			transform: "matrix(1,0,0,1,"+x+","+y+")"
		})
	});
	$('.sub-btn').on('click',function(){
		$.ajax({
			url:'/add',
			type:'post',
			dataType:'json',
			data:{
				content:$('#content').val()
			}
		})
		.done(function(result){
			if(result.status==0){
				var $dom =`<div class="wish" style="background: ${result.data.color}">
								<a href="javascript:;" class="close" data-id='${result.data.id}'></a>
								${result.data.content}
							</div>`
			}else{
				alert(result.message)
			}
		})
	})

})(jQuery);	
