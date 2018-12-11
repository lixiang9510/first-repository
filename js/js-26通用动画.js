// alert('a');
var timer=0;
	function animal(obj,attr,target){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var ispeed=7;
			var current=parseFloat(getComputedStyle(obj,false)[attr]);
			if(attr=='opacity'){
				current=Math.round(current*100);
			}
			ispeed=(target-current)*Math.abs(1/(target-current))*ispeed;
			if(Math.abs(current-target)<=Math.abs(ispeed)){
				if(attr=='opacity'){
					obj.style[attr]=target/100;
				}else{
					obj.style[attr]=target+'px';
				}
				clearInterval(obj.timer);
			}else{
				if(attr=='opacity'){
					obj.style[attr]=(current+ispeed)/100;
				}else{
					obj.style[attr]=current+ispeed+'px';
				}	
			}
		},10)
	}
	function compatible(compati){
		var compati=document.documentElement.scrollTop||document.body.scrollTop;
	}
