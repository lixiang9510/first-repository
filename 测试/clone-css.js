//模仿css作业
// ;(function($){
// 	$.fn.extend({
// 		clonecss:function(atrs,values){
// 			// console.log($eDiv==this);
// 			return this.each(function($eDiv){
// 				var $eDiv=$(this);
// 				if(!values){
// 					console.log($eDiv.css(atrs));
// 				}else{
// 					$eDiv.css(atrs,values);
// 				}
// 			})
// 		}
// 	})
// })(jQuery)

//课堂作业1
;(function($){
	$.fn.extend({
		clonecss:function(attr,values,x,y){
			return this.each(function(){
				var $elem=$(this);
				$elem.css(attr,values);
				if(x){
					$elem.css('left',x)
				}
				if(y){
					$elem.css('top',y)
				}
			})
		},
		aaaa:function(bb){
			return this.each(function(){
				var $elem=$(this);
				if(!bb){
					$elem.css('left',0);
					$elem.css('top',0)
				}else{
					$elem.css('left',window.innerWidth-200);
					$elem.css('top',window.innerHeight-200);
				}
			})
		}
	})
})(jQuery)

;(function($){
	function SetBox($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.x = null;
		this.y = null;
		this.init()
	}

	SetBox.prototype = {
		constructor:SetBox,
		init:function(){
			this.$elem.css({
				width:this.options.width,
				height:this.options.height,
				background:this.options.backcround,
				position:"fixed",
				top:this.options.top,
				left:this.options.left
			})
		},
		leftTop:function(){
			this.$elem.css({left:0,top:0,right:'',bottom:''})
		},
		rightBottom:function(){
			this.$elem.css({right:0,bottom:0,left:'',top:''})
		},
		bindEvent:function(){
			this.x = this.$elem.offset().left;
			this.y = this.$elem.offset().top;
			console.log(this.x,this.y)
			if(this.x == 0){
				this.rightBottom();
			}else if(this.x != 0){
				this.leftTop();
			}
		},
		onClick:function(){
			this.bindEvent()
		}
	}

	SetBox.DEFAULT = {
		width:100,
		height:100,
		backcround:"red",
		top:'50px',
		left:'50px'
	}

	$.fn.extend({
		setBox:function(options){
			return this.each(function(){
				var $this = $(this);
				options = $.extend({},SetBox.DEFAULT,options)
				var oBox = new SetBox($this,options);
				$this.on('click',function(){
					oBox.onClick();
				})
			})
		}
	})
})(jQuery);