;(function($){
	$.fn.extend({
		clonecss:function(atrs,values){
			console.log($eDiv==this)
			return this.each(function($eDiv){
				var $eDiv=$(this);
				if(!values){
					console.log($eDiv.css(atrs));
				}else{
					$eDiv.css(atrs,values);
				}
			})
		}
	})
})(jQuery)