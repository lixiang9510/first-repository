// alert('a');
var timer=0;
	/*
	注释：
	object   	obj 		传入的对象
	attr		属性
	不传就是匀速，传了就是减速
	*/
	function animate(obj,attr,target,decelerate,fnEnd){
		var ispeed=10;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			if(!decelerate){
				ispeed=100;
			}
			var current=parseFloat(getComputedStyle(obj,false)[attr]);
			if(attr=='opacity'){
				current=Math.round(current*100);
			}else{
				current=Math.round(current);
			}
			if(decelerate){
				if(Math.abs(ispeed)>1){
					ispeed=(target-current)/10;
				}else{
					ispeed=(target-current)*Math.abs(1/(target-current));
				}
				if(!ispeed){
					clearInterval(obj.timer);
					if(fnEnd){
						fnEnd();
					}	
				}
			}else{
				ispeed=(target-current)*Math.abs(1/(target-current))*Math.abs(ispeed);
				if(Math.abs(current-target)<=Math.abs(ispeed)){
					if(attr=='opacity'){
						obj.style[attr]=target/100;
					}else{
						obj.style[attr]=target+'px';
					}
						clearInterval(obj.timer);
						if(fnEnd){
							fnEnd();
						}	
				}
			}
			if(attr=='opacity'){
				obj.style[attr]=(current+ispeed)/100;
			}else{
				obj.style[attr]=current+ispeed+'px';
			}
			console.log(ispeed,current);
		},30)
	}
	function compatible(com){
		 com=document.documentElement.scrollTop||document.body.scrollTop;
	}
