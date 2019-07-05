
//顶部导航
(function(){
	var TopMoveNav = document.querySelector('.top-move-nav');
	var oAddMasking = TopMoveNav.querySelector('.add-masking');
	var oUl = TopMoveNav.querySelector('ul');
	var aLi = oUl.querySelectorAll('li');
	oAddMasking.style.width = aLi[0].offsetWidth+"px";
	for(var i = 0;i<aLi.length;i++){
		aLi[i].onmouseover = function(){
			oAddMasking.style.width = this.offsetWidth+"px";
			oAddMasking.style.left = this.offsetLeft+"px";
		}
		aLi[i].onmouseleave = function(){
			oAddMasking.style.width = aLi[0].offsetWidth+"px";
			oAddMasking.style.left = 0+"px";
		}
	}
})();
//封装动画
(function(w){
	function animate(obj,options,decelerate,fnEnd){
		var ispeed=10;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var isStopAll=true;
			for(var attr in options){
				var isStopOne=true;
				if(!decelerate){
					ispeed=7;
				}
				var current=parseFloat(getComputedStyle(obj,false)[attr]);
				if(attr=='opacity'){
					current=Math.round(current*100);
				}else{
					current=Math.round(current);
				}
				if(decelerate){
					if(Math.abs(ispeed)>1){
						ispeed=(options[attr]-current)/10;
					}else{
						ispeed=(options[attr]-current)*Math.abs(1/(options[attr]-current));
					}
					if(!ispeed){
						isStopOne=false;			
					}else{
						isStopAll=false;
					}
				}else{
					ispeed=(options[attr]-current)*Math.abs(1/(options[attr]-current))*Math.abs(ispeed);
					if(Math.abs(current-options[attr])<=Math.abs(ispeed)){
						if(attr=='opacity'){
							obj.style[attr]=options[attr]/100;
						}else{
							obj.style[attr]=options[attr]+'px';
						}
						isStopOne=false;
					}else{
						isStopAll=false;
					}
				}
				if(isStopAll){
					clearInterval(obj.timer);
					if(!isStopOne){
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
			}	
		},30)
	}
	w.animate = animate;
})(window);
//轮播图
(function(){
	function Carousel(opation){
		this.oBox=document.getElementById(opation.id);
		this.aImg=opation.aImg;
		
		this.width=opation.width;
		this.height=opation.height;
		this.oUl=null;
		this.oLi=null;
		this.oImg=null;
		this.now=0;
		this.timer=0;
		this.aLi=null;
		this.aLi2=null;
		this.init();
		this.leftRight();
		this.bottomSpot();
		this.changeImg();
	}
	//for add three img 
	Carousel.prototype.init=function(){
		this.oUl=document.createElement('ul');
		for(i=0;i<this.aImg.length;i++){
			this.aImg[i].index=i;
			this.oLi=document.createElement('li');
			this.oImg=document.createElement('img');
			this.oImg.src=this.aImg[i];
			this.oImg.style.width=this.width+'px';
			this.oImg.style.height=this.height+'px';
			this.oLi.appendChild(this.oImg);
			this.oUl.appendChild(this.oLi);
			this.oLi.style.position="absolute";
			this.oLi.style.top="0px";
			this.oLi.style.left="0px";
			this.oLi.style.zIndex=1;
			this.oLi.style.opacity=0.5;
			if(i==0){
				this.oLi.style.zIndex=9;
				this.oLi.style.opacity=1;
			}
		}
		this.oBox.appendChild(this.oUl);
		this.oBox.style.width=this.width+'px';
		this.oBox.style.height=this.height+'px';
		this.oBox.style.marginLeft=-this.width*0.5+'px';
		this.oUl.style.listStyle='none';
		this.aLi=this.oUl.children;
	}
	//for add left and right button;
	Carousel.prototype.leftRight=function(){
		var _this=this;
		this.toLeft=document.createElement('div');
		this.toLeft.className="leftless";
		this.toLeft.innerHTML='&lt;'
		this.toRight=document.createElement('div');
		this.toRight.className='rightmore';
		this.toRight.innerHTML='&gt;'
		this.oBox.appendChild(this.toLeft);
		this.oBox.appendChild(this.toRight);
		this.toRight.onclick=function(){
			_this.now++;
			if(_this.now==_this.aLi.length){
				_this.now=0;
			}
			_this.changeImg();
		}
		this.toLeft.onclick=function(){
			_this.now--;
			if(_this.now<0){
				_this.now=_this.aLi.length-1;
			}
			_this.changeImg();
		}
	}
	//for add bottom button
	Carousel.prototype.bottomSpot=function(){
		var _this=this;
		this.oUl2=document.createElement('ul');
		for(i=0;i<this.aImg.length;i++){
			this.aImg[i].index=i;
			this.oLi2=document.createElement('li')
			this.oUl2.appendChild(this.oLi2);
			this.oLi2.style.width='20px';
			this.oLi2.style.height='20px';
			this.oLi2.style.float='left';
			this.oLi2.style.backgroundColor='#333';
			this.oLi2.style.marginRight='10px';
			this.oLi2.style.borderRadius='50%';
			this.oLi2.style.opacity=0.5;
			if(i==0){
				this.oLi2.style.opacity=1;
			}
		}
		this.oBox.appendChild(this.oUl2);
		this.oUl2.style.listStyle='none';
		this.oUl2.style.position='absolute';
		this.oUl2.style.bottom='20px';
		this.oUl2.style.left='50%';
		this.oUl2.style.marginLeft=-this.oUl2.offsetWidth*0.5+'px';
		this.oUl2.style.zIndex=99;
		this.aLi2=this.oUl2.children;
		for(i=0;i<this.aLi2.length;i++){
			this.aLi2[i].index=i;
			this.aLi2[i].onclick=function(){
				_this.now=this.index;
				_this.changeImg();
			}
		}
		this.timer=setInterval(this.toRight.onclick,1000);

		this.oBox.onmouseover=function(){
			clearInterval(_this.timer);
		}
		this.oBox.onmouseout=function(){
			_this.timer=setInterval(_this.toRight.onclick,1000);
		}
	}
	//add a common function;
	Carousel.prototype.changeImg=function(){
			for(i=0;i<this.aLi.length;i++){
				for(i=0;i<this.aLi.length;i++){
					this.aLi[i].style.opacity=0.5;
					this.aLi[i].style.zIndex=1;
					this.aLi2[i].style.opacity=0.5;					
				}
				this.aLi[this.now].style.zIndex=9;
				animate(this.aLi[this.now],{'opacity':100},0)
				this.aLi2[this.now].style.opacity=1;
			}
		}
	new Carousel({
		id:'box',
		aImg:["images/beauty1.jpeg","images/beauty2.jpg","images/beauty3.jpg","images/beauty4.jpeg","images/beauty5.jpg"],
		width:1226,
		height:560
	});
})();
//推荐课程
(function(){
	var ImgCardBox = document.querySelector(".left-circle-card");
	var ImgCardBoxTitle = ImgCardBox.querySelector('.title')
	var ImgCardBoxAddImg = ImgCardBox.querySelector('.add-img')
	ImgCardBox.onmouseenter=function(){
		ImgCardBox.style.border="1px solid #ff6700";
		ImgCardBoxAddImg.style.borderTop = "1px solid #ff6700";
		ImgCardBoxAddImg.style.borderRight = "1px solid #ff6700";
	}
	ImgCardBoxTitle.onmouseover=function(){
		this.style.color = "red"
	}
	ImgCardBoxTitle.onmouseout=function(){
		this.style.color = "black"
	}
	ImgCardBox.onmouseleave=function(){
		ImgCardBox.style.border="1px solid #ccc";
		ImgCardBoxAddImg.style.borderTop = "1px solid #ccc";
		ImgCardBoxAddImg.style.borderRight = "1px solid #ccc";
	}
})();
//课程分类
(function(){
	function Tab(listSelector,containerSelector){
		this.aBtn = document.querySelectorAll(listSelector);
		this.aContent = document.querySelectorAll(containerSelector);
		this.bindEvent();
	}
	Tab.prototype.bindEvent = function(){
		var _this = this;
		for(var i=0;i<this.aBtn.length;i++){
			this.aBtn[i].index = i;
			this.aBtn[i].onclick=function(){
				console.log(this.index);
				_this.fnClick(this);
			}
		}
	}
	Tab.prototype.fnClick = function(oBtn){
		for(var j=0;j<this.aBtn.length;j++){
			this.aBtn[j].className = '';
			this.aContent[j].style.display = 'none';
		}
		oBtn.className = "active";
		this.aContent[oBtn.index].style.display = "block";
	}
	new Tab('#my-own-tab .tab-list li','#my-own-tab .tab-container .first-li');
})();
//倒计时
(function(){
	var oBox=document.querySelector('.school-intro .for-add-discount .discount-left-img .add-count-down');
	var setTime=new Date('2019/7/5 19:30:00');
	var aImag=oBox.children;
	var timer=0;
	function number1(num){
		num<10 ? num='0'+num : num=''+num;
		return num;
	}
	function conment1(){
		var allTime=setTime.getTime()-Date.now();
		var allSecond=parseInt(allTime/1000);
		if(allTime<=0){
			clearInterval(timer);
			allSecond=0;
		}
		var oHours=parseInt(allSecond/3600);
		var oMinutes=parseInt((allSecond%3600)/60);
		var oSeconds=(allSecond%3600)%60;
		var oTimernumber=number1(oHours)+number1(oMinutes)+number1(oSeconds);
		for(i=0;i<aImag.length;i++){
			aImag[i].src="images/"+oTimernumber[i]+".png";
		}
	}
	timer=setInterval(conment1,500);
})();
//滚动条
(function(){
	var oBtn = document.querySelector('.school-intro .school-intro-advantage #btn');
	var oBox = document.querySelector('.school-intro .school-intro-advantage .box');
	var oWrap = document.querySelector('.school-intro .school-intro-advantage #wrap');
	var oTxt = document.querySelector('.school-intro .school-intro-advantage #txt');
	var oContent = document.querySelector('.school-intro .school-intro-advantage #content');
	var disY = 0,t = 0;
	oBtn.onmousedown = function(ev){
		disY = ev.clientY - oBtn.offsetTop;
		document.onmousemove = function(ev){
			t = ev.clientY - disY;
			handleMove();
		}
		function handleMove(){
			if(t < 0){
				t = 0;
			}else if(t > oWrap.offsetHeight - oBtn.offsetHeight){
				t = oWrap.offsetHeight - oBtn.offsetHeight;
			}
			var scale = t / (oWrap.offsetHeight - oBtn.offsetHeight);

			oBtn.style.top = t + 'px';

			oTxt.style.top = -(oTxt.offsetHeight-oContent.offsetHeight) * scale + 'px';			
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}	
})();
//地图
(function(){
		function initMap(){
	        createMap();//创建地图
	        setMapEvent();//设置地图事件
	        addMapControl();//向地图添加控件
	        addMarker();//向地图中添加marker
	        addRemark();//向地图中添加文字标注
	    }
	    //创建地图函数：
	    function createMap(){
	        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
	        var point = new BMap.Point(114.734459,33.664909);//定义一个中心点坐标
	        map.centerAndZoom(point,16);//设定地图的中心点和坐标并将地图显示在地图容器中
	        window.map = map;//将map变量存储在全局
	    } 
	    //地图事件设置函数：
	    function setMapEvent(){
	        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
	        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
	        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
	        map.enableKeyboard();//启用键盘上下左右键移动地图
	    }  
	    //地图控件添加函数：
	    function addMapControl(){
	        //向地图中添加缩放控件
	    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	    map.addControl(ctrl_nav);
	        //向地图中添加缩略图控件
	    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	    map.addControl(ctrl_ove);
	        //向地图中添加比例尺控件
	    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	    map.addControl(ctrl_sca);
	    }
	    //标注点数组
	    var markerArr = [{title:"我的标记",content:"我的备注",point:"114.72429|33.66231",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	         ];
	    //创建marker
	    function addMarker(){
	        for(var i=0;i<markerArr.length;i++){
	            var json = markerArr[i];
	            var p0 = json.point.split("|")[0];
	            var p1 = json.point.split("|")[1];
	            var point = new BMap.Point(p0,p1);
	            var iconImg = createIcon(json.icon);
	            var marker = new BMap.Marker(point,{icon:iconImg});
	            var iw = createInfoWindow(i);
	            var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
	            marker.setLabel(label);
	            map.addOverlay(marker);
	            label.setStyle({
	                        borderColor:"#808080",
	                        color:"#333",
	                        cursor:"pointer"
	            });
	            
	            (function(){
	                var index = i;
	                var _iw = createInfoWindow(i);
	                var _marker = marker;
	                _marker.addEventListener("click",function(){
	                    this.openInfoWindow(_iw);
	                });
	                _iw.addEventListener("open",function(){
	                    _marker.getLabel().hide();
	                })
	                _iw.addEventListener("close",function(){
	                    _marker.getLabel().show();
	                })
	                label.addEventListener("click",function(){
	                    _marker.openInfoWindow(_iw);
	                })
	                if(!!json.isOpen){
	                    label.hide();
	                    _marker.openInfoWindow(_iw);
	                }
	            })()
	        }
	    }
	    //创建InfoWindow
	    function createInfoWindow(i){
	        var json = markerArr[i];
	        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
	        return iw;
	    }
	    //创建一个Icon
	    function createIcon(json){
	        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
	        return icon;
	    }
		//文字标注数组
	    var lbPoints = [{point:"114.724236|33.662716",content:"周口培训中心"}
	         ];
	    //向地图中添加文字标注函数
	    function addRemark(){
	        for(var i=0;i<lbPoints.length;i++){
	            var json = lbPoints[i];
	            var p1 = json.point.split("|")[0];
	            var p2 = json.point.split("|")[1];
	            var label = new BMap.Label("<div style='padding:2px;'>"+json.content+"</div>",{point:new BMap.Point(p1,p2),offset:new BMap.Size(3,-6)});
	            map.addOverlay(label);
	            label.setStyle({borderColor:"#999"});
	        }
	    }
	    
	    initMap();//创建和初始化地图
})();
//评论运动
(function(){
	var oBox = document.querySelector('.student-assessment-content');
	var oUl = oBox.querySelector('ul')
	var aLi = oUl.querySelector('li');
	window.onload = function(){
		var current = 0;
		setInterval(function(){
			oUl.style.top = current + "px";
			current = current-125;
			if(current == -625){
				current = 0;
			}
		},1000)
	}
})();
(function(){
		var FixedLeftNav = document.querySelector('.fixed-left-nav');
		var aLi = FixedLeftNav.querySelectorAll('li');
		console.log(aLi);
		var arr = ['rgb(255,162,0)','rgb(110,126,255)','rgb(255,120,0)','rgb(0,168,240)'];
		var i = 0;
		setInterval(function(){
			FixedLeftNav.style.background = arr[i];
			for(var j=0;j<aLi.length;j++){
				aLi[j].style.background = arr[i];
			}
			i = i+1;
			if(i == arr.length+1){
				i = 0;
			}
		},1000);
		window.onscroll=function(){
			if(document.documentElement.scrollTop >= 600){
				FixedLeftNav.style.transition = 'opacity 0.5s linear';
				FixedLeftNav.style.opacity = 1;
			}else{
				FixedLeftNav.style.transition = 'opacity 0.5s linear';
				FixedLeftNav.style.opacity = 0;
			}
		}
})();