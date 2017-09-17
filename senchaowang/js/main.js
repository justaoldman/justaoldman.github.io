//封装类似jquery方法 比较偏简单
var jquery = {
	/*
	 *添加class方法  给当前元素添加class
	 * cur   		当前操作dom
	 * className    要检查的class
	*/
	addClass:function(cur,curClassName){
		//判断如果当前元素有要添加的class 则不去执行添加class操作
		if(!this.hasClass(cur,curClassName)){ 
			//添加一个class 
			cur.className += ' ' + curClassName;
		}
	},
	/*
	 *移出class方法  给当前元素移出class
	 * cur   		当前操作dom
	 * className    要检查的class
	*/
	removeClass: function(cur,curClassName){	
		//判断如果是传入一个数组对象  走if 循环拿到每一个对象 然后移出class
		if(cur.length > 0 ){
			for(var i=0;i < cur.length;i++){
				if(this.hasClass(cur[i],curClassName)){
					//删除class
					cur[i].className = cur[i].className.replace(new RegExp("(^| +)"+curClassName+"( +|$)",'g'),'');
				}	
			}
		}else{
			//删除class
			cur.className = cur.className.replace(new RegExp("(^| +)"+curClassName+"( +|$)",'g'),'');
		}
	},
	/*
	 *检查当前元素是否有这个class 拿到true和false 有传入的class则返回true  没有返回false
	 * cur   		当前操作dom
	 * className    要检查的class
	*/
	hasClass:function(cur,className){
		return cur.className.indexOf(className) >=0 ? true : false;
	},
	/*
	 * 隐藏标签方法
	 * cur  当前操作dom
	*/
	hide:function(cur){
		// console.log(cur);
		//判断如果是传入一个数组对象  走if 循环拿到每一个对象然后操作隐藏
		if(cur.length > 0 ){
			for(var i=0;i < cur.length;i++){
				if(this.css(cur[i],'display')){
					//隐藏当前元素
					cur[i].style.display = "none";
				}
			}
		}else{
			//隐藏当前元素
			cur.style.display = "none";
		}
	},
	/*
	 * 显示标签方法
	 * cur  当前操作dom
	*/
	show:function(cur){
		//显示当前元素
		cur.style.display = "block";
	},
	/*
	 *获取css设置样式
	 *cur  当前操作dom
	 *attribute 要获取的css属性
	 *
	*/
	css : function(cur,attribute){
		//ie8一下版本不能使用getComputedStyle方法，而要用currenrStyle方法，用currentStyle
		return cur.currentStyle?cur.currentStyle[attribute]:document.defaultView.getComputedStyle(cur,false)[attribute]; 
	},
	//动画
	paddingMove : function(cur,moveNum){
		clearInterval(cur.times);
		cur.times = setInterval(function(){
			//获取当前元素paddingLeft
			var pLeft = parseInt(cur.style.paddingLeft) || 0;
			//运动速度
			var speed = 0;
			if(moveNum > 0){
				speed = parseInt(pLeft + 10)/10;
				
				if(pLeft >= moveNum ){
					clearInterval(cur.times);
					return;
				}
			}else{
				speed = -parseInt(pLeft + 10)/10;
				if(pLeft <= moveNum ){
					clearInterval(cur.times);
					return;
				}
			}
			speed = speed > 0 ? Math.floor(speed) : Math.ceil(speed);
			cur.style.paddingLeft  = (pLeft + speed) + 'px';
		},20)
	}

}

//城市列表功能
function cityListPlan(){
	//城市列表最大层
	var cityWarp = document.getElementById('J_cityWarp');
	//城市名称
	var cityName = document.querySelector('.city-name');
	//城市列表
	var cityList = document.getElementById('J_moreCity');
	//城市列表子列表
	var cityListSon  = cityList.getElementsByTagName('span');
	//保存当前城市名称class
	var cityNameClass = cityName.className;
	//鼠标移入城市区域
	cityWarp.onmouseover = function(){
		jquery.addClass(cityName,'city-active');
		jquery.show(cityList);
	}
	//鼠标移出城市区域 方法1
	cityWarp.onmouseout = function(){
		//封装removeClass来移出选中的class
		jquery.removeClass(cityName,'city-active')
		jquery.hide(cityList);
	}
//	//鼠标移出城市区域 方法2	
//	cityWarp.onmouseout = function(){
//		//通过事先保存的城市名称的class再赋值上去
//		cityName.className = cityNameClass;
//		jquery.hide(cityList);
//	}

	//事件委托绑定城市列表事件
	cityList.onclick = function(event) {
		var ev = event || window.event;
		//获取点击目标
		var tar = event.target;
		//获取当前点击元素的标签
		if(tar.nodeName == 'SPAN'){
			//获取当前点击元素innerhtml 赋值到城市名称上面
			cityName.innerHTML = tar.innerHTML;
			//移除选中class
			jquery.removeClass(cityName,'city-active')
			//隐藏城市列表
			jquery.hide(cityList);
		}
	}
	//循环绑定城市列表事件
//	for (var i = cityListSon.length-1; i >= 0; i--) {
//		cityListSon[i].onclick = function(){
//			//获取当前点击元素innerhtml 赋值到城市名称上面
//			cityName.innerHTML = this.innerHTML;
//			//移除选中class
//			jquery.removeClass(cityName,'city-active');
//			//隐藏城市列表
//			jquery.hide(cityList);
//		}
//	}
}
//购物车
function  scCart(){
	//获取购物车最大层
	var cart = document.getElementById('J_mycartWarp');
	//获取购物车
	var cartDom = document.getElementById('J_mycartArea');
	//获取要显示购物车区域
	var  myCart = document.getElementById('J_mycart');
	//购物车绑定鼠标移入事件
	cart.onmouseover = function(ev){
		//给购物车添加class
		jquery.addClass(cartDom,'carthover');
		//显示购物车列表
		jquery.show(myCart);
	}
	//购物车绑定鼠标移出事件
	cart.onmouseout = function(){
		//移除选中的class
		jquery.removeClass(cartDom,'carthover');
		//隐藏购物车列表
		jquery.hide(myCart);
	}
}

//菜单栏
function menuPlan(){
	//获取整个菜单
	var warpMenu = document.getElementById('J_warpMenu');
	//获取菜单
	var menu = document.getElementById('J_menu');
	//获取菜单列表
	var menuList = menu.getElementsByTagName('li');
	//获取二级菜单
	 
	var sonMenu = document.getElementById('J_sonMenu');
	//获取二级菜单列表
	var sonMenuList = sonMenu.querySelectorAll('.commonidty-son-detail');
	//三级菜单列表
	var homeList = document.getElementById('J_home').getElementsByTagName('li');
	//三级菜单子列表
	var sonHomeList = document.querySelectorAll('#J_sonHome .commonidty-son-ul');

	
	//for循环绑定菜单列表鼠标移出移入事件 建议不理解的同学使用for循环绑定事件 不用事件委托
	for(var i = 0,len = menuList.length; i < len; i++) {
		//给每个元素赋index
		menuList[i].index = i;
		//给每个元素赋times
		menuList[i].times = null;
		menuList[i].onmouseover = function(){
			jquery.paddingMove(this,20);
			//判断当前选中
			if(!jquery.hasClass(this,'lihoverstyle')){
				//显示二级子菜单
				jquery.show(sonMenu);
				//移出选中的class
				jquery.removeClass(menuList,'lihoverstyle')
				//当前添加class
				jquery.addClass(this,'lihoverstyle');
				//隐藏所有的子菜单内容
				jquery.hide(sonMenuList);
				//判断当前子菜单是否有内容
				if(sonMenuList[this.index]){
					//显示对应的菜单内容
					jquery.show(sonMenuList[this.index]);
				}
			}
		};
		menuList[i].onmouseout = function(){
			jquery.paddingMove(this,0);
		}
	}
	//事件委托绑定菜单栏鼠标移入事件  
//	 menu.onmouseover = function(event){
//	 		//兼容ie
//	 		var ev = event || window.event
//	 		,_current = ev.target  || ev.srcElement;
//	 		//判断如果是li标签子元素话赋值到li
//	 		_current = (ev.target.tagName == 'H3' ) ?  ev.target.parentNode : _current; 
//	 		_current = (ev.target.tagName == 'A' ) ?  ev.target.parentNode.parentNode : _current; 
//	 		if(_current.tagName == 'LI'){
//	 			//获取当前元素索引
//	 			var curIndex =	Array.prototype.slice.call(menuList).indexOf(_current);
//	 			//执行动画
//	 			jquery.paddingMove(_current,20);
//	 			//判断当前元素是否被选中
//	 			if(!jquery.hasClass(_current,'lihoverstyle')){
//	 				//显示二级子菜单
//	 				sonMenu.style.display = 'block';
//	 				//移除被选中class
//	 				jquery.removeClass(menuList,'lihoverstyle');
//	 				//隐藏显示的子菜单
//	 				jquery.hide(sonMenuList);
//	 				//当前选中元素添加class
//	 				jquery.addClass(_current,'lihoverstyle');
//	 				//判断当前子菜单是否有内容
//	 				if(sonMenuList[curIndex]){
//	 					//显示对应的菜单内容
//						jquery.show(sonMenuList[this.index]);
//	 				}
//	 			}
//	 		}
//	 }
//	 //事件委托绑定菜单栏鼠标移出事件
//	 menu.onmouseout = function(event){
//	 	var ev = event || window.event
//	 		,_current = ev.target;
//	 	//判断如果是li标签子元素话赋值到li
//	 	_current = (ev.target.tagName == 'H3' ) ?  ev.target.parentNode : _current; 
//	 	_current = (ev.target.tagName == 'A' ) ?  ev.target.parentNode.parentNode : _current; 
//	 	if(_current.tagName == 'LI'){
			//动画归0
//	 		jquery.paddingMove(_current,0);
//	 	}
//	 }

	/*
	 * 绑定菜单栏最大区域移出事件
	 * onmouseleave 事件类似于 onmouseout 事件。 唯一的区别是 onmouseleave 事件不支持冒泡 。
	*/
	warpMenu.onmouseleave = function(){
		//隐藏菜单栏对应内容
	 	jquery.hide(sonMenu);
	 	//移出选中菜单栏class
	 	jquery.removeClass(menuList,'lihoverstyle');
	 }
	
	//三级菜单事件
  	for(var j = 0, hLen = homeList.length; j < hLen;j++){
  		//给每个元素赋index
		homeList[j].index = j;
		homeList[j].onclick = function(){
			//移出选中的class
			jquery.removeClass(homeList,'active');
			//隐藏所有的三级子菜单内容
			jquery.hide(sonHomeList);
			//当前元素添加class
			jquery.addClass(this,'active');
			//判断当前三级子菜单是否有内容
			if(sonHomeList[this.index]){
				//显示对应的三级菜单内容
				jquery.show(sonHomeList[this.index]);
			}
		}
  	}
	
}


//菜单栏鼠标移入方法 除了首页别的页面可能都会调用
function productMove(){
	var product = document.getElementById('J_productMove')
		,menu  = document.getElementById('J_warpMenu');
	product.onmouseenter = function(){
		jquery.show(menu);
	}
	product.onmouseleave = function(){
		jquery.hide(menu);
	}
}