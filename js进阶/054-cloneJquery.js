(function(window){
	var kQuery=function(selector){
		return new kQuery.fn.init(selector);
	}
	kQuery.fn=kQuery.prototype={
		constructor:kQuery,
		init:function(selector){
			if(!selector){
				return this;
			}
			else if(selector=="function"){
				return this;
			}
		}

	}
	kQuery.fn.init.prototype=kQuery.fn; 
	window.$=window.kQuery=kQuery;
})(window);