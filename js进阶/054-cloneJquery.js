(function(window){
	var kQuery=function(selector){
		return new kQuery.fn.init(selector);
	}
	kQuery.fn=kQuery.prototype={
		constructor:kQuery,
		init:function(selector){
			//1.布尔值
			if(!selector){
				return this;
			}
			//2. 函数
			else if(kQuery.isFunction(selector)){
				window.addEventListener=("DOMConterLoaded",selector);
				this[0]=document;
				this.length=1;
				return this;
			}
			//3.字符串
			
			else if(kQuery.isString(selector)){
				//3.1 html代码
				if(kQuery.isHtml(selector)){
					var tempDom=document.createElement('div');
					tempDom.innerHTML=selector;
					for(var i=0;i<tempDom.children.length;i++){
						this[i]=tempDom.children[i];
					}
					this.length=tempDom.children.length;
					return this;
				}
				//3.2 选择器
				else{
					var doms=document.querySelectorAll(selector);
					for(var i=0;i<doms.length;i++){
						this[i]=doms[i];
					}
					this.length=doms.length;
				}
			}
			
			//4.数组
			//4.1 真数组
			//4.2 假数组
			//5.对象
			//5.1普通对象
			//5.2 Dom对象
			
			
		}

	}
	kQuery.isFunction=function(fn){
		return typeof fn=='function';
	}
	kQuery.isString=function(str){
		return typeof str=='string';
	}
	kQuery.isHtml=function(str){
		return /<[^<>]+>/.test(str);
	}
	kQuery.fn.init.prototype=kQuery.fn; 
	window.$=window.kQuery=kQuery;
})(window);