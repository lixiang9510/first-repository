/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
alert('b');
;(function($){
	var passwordReg = /^\w{3,6}$/;
	$('#btn-sub').on('click',function(){
		alert('a');
		var $errs = $('.err');
		var password = $('[name="password"]').val();
		var repassword = $('[name="repassword"]').val();
		
		if(!passwordReg.test(password)){
			$errs.eq(0).html('密码格式不正确');
			return false;
		}else{
			$errs.eq(0).html('');
		}
		if(password != repassword){
			$err.eq(1).html('两次密码不一致');
			return false;
		}else{
			$err.eq(1).html('');
		}
	})
})(jQuery);