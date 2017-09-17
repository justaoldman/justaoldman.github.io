window.onload = function(){
	//首页大轮播图配置
	$(".carousel").slide({ 
		titCell:".num ul" , 	//导航元素对象（鼠标的触发元素对象）
		autoPage:true,			//轮播自动分页，需结合titCell使用
		mainCell:".buypicul" , 	//切换元素的包裹层对象
		effect:"left", 			//轮播动画效果
		autoPlay:true,  		//自动轮播
		delayTime:500 ,			//动画效果速度
		interTime:2000			//毫秒；自动运行间隔
	});
	
	//seciton里面内容所有轮播
	$(".flex-viewport").slide({ 
		titCell:".slides-ol" , 	//导航元素对象（鼠标的触发元素对象）
		autoPage:'<li></li>',			//轮播自动分页，需结合titCell使用
		mainCell:".slides" , 	//切换元素的包裹层对象
		effect:"fold", 			//轮播动画效果
		autoPlay:true,  		//自动轮播
		delayTime:500 ,			//动画效果速度
		interTime:2000			//毫秒；自动运行间隔
	});
	//城市列表
	cityListPlan();
	//购物车
	scCart();
	//菜单栏
	menuPlan();
	//tab切换
	tabList();
	//ajax请求xml数据
	 xmlAjax();
	//ajax请求json数据
	//jsonAjax();
	//首页所有功能jquery方法集合
	// jqueryPlan();
}

//json获取数据渲染
function jsonAjax(){
	$.ajax({
		type:'get',
		url:'data/index.json',
		success: function(resp){
			//获取json城市列表
			var cityName = resp.data.city;
			console.log(cityName)
			var htmlStr = "";
			// for循环遍历
			for(var i= 0;i < cityName.length;i++){
				htmlStr +=  '<span>' + cityName[i].cityname  + '</span>'
			}
			//jquery each循环遍历
			// $.each(cityName,function(i,ele){
			// 	htmlStr += '<span>' + ele.cityname + '</span>';
			// })
			$('.city-list').html(htmlStr);
		}
	})
}
//xml获取数据渲染
function xmlAjax(){
	$.ajax({
		type:'get',
		url:'data/index.xml',
		success: function(data){
			//获取xml城市列表
			var cityName = data.querySelector('city').querySelectorAll('cityName');
			var htmlStr = "";
			//for循环遍历
			for(var i= 0;i < cityName.length;i++){
				htmlStr +=  '<span>' + cityName[i].innerHTML  + '</span>'
			}
			// //jquery each循环遍历
			// $.each($cityName,function(i,ele){
			// 	htmlStr += '<span>' + $(ele).text() + '</span>';
			// })
			$('.city-list').html(htmlStr);
		}
	})
}
//tab切换
function tabList(){
	var tab = document.querySelectorAll('.tab-right-common');
	var tabList = null;
	//for循环绑定tab切换事件
	for(var i=0,len = tab.length;i < len;i++){
		tabList = tab[i].querySelectorAll('li');
		for(var j=0;j < tabList.length;j++){
			tabList[j].onclick = function(){
				var list = this.parentNode.querySelectorAll('li');
				jquery.removeClass(list,'active');
				jquery.addClass(this,'active');
			}
		}
	}

	//闭包
	// for(var i=0,len = tab.length;i < len;i++){
	// 	tabList = tab[i].querySelectorAll('li');
	// 	(function(list){
	// 		for(var j=0;j < list.length;j++){
	// 			list[j].onclick = function(){
	// 				jquery.removeClass(list,'active');
	// 				jquery.addClass(this,'active');
	// 			}
	// 		}
	// 	})(tabList);
	// }
	

	//es6 let变量方法
	// for(var i=0,len = tab.length;i < len;i++){
	// 	tabList = tab[i].querySelectorAll('li');
	// 	for(let j=0,list = tabList;j < list.length;j++){
	// 		tabList[j].onclick = function(){
	// 			jquery.removeClass(list,'active');
	// 			jquery.addClass(this,'active');
	// 		}
	// 	}
	// }
}
//jquery方法实现
function jqueryPlan(){
	//城市列表
	$('.city-list-content').hover(function(){
		$('.city-name').addClass('city-active');
		$('#J_moreCity').show();
	},function(){
		$('.city-name').removeClass('city-active');
		$('#J_moreCity').hide();
	})
	//城市列表点击事件
	$('.city-list').on('click','span',function(){
		$('#J_moreCity').hide();
		$('.city-name').html($(this).html());
		$('.city-name').removeClass('city-active');
	})
	//购物车
	$('.myCart').hover(function(){
		$('.cart-area').addClass('carthover');
		$('#J_mycart').show();
	},function(){
		$('.cart-area').removeClass('carthover');
		$('#J_mycart').hide();
	})
	//菜单方法
	$('#J_menu li').hover(function(){
		var _current = $(this);
		if(!_current.hasClass("lihoverstyle")){
			//动画效果
			_current.stop().animate({paddingLeft:'20px'},300)
			$('#J_sonMenu').css({left:'190px',opacity:'0.5'}).show();
			$('#J_sonMenu').stop().animate({left:"200px", opacity:1},250);
			//移出所有lihoverstyle
			$('#J_menu li').removeClass('lihoverstyle');
			//隐藏所有二级菜单列表
			$('#J_sonMenu .commonidty-son-detail').hide();
			//显示二级菜单
			$('#J_sonMenu').show();
			//当前元素添加class
			_current.addClass('lihoverstyle');
			//判断是否有对应的二级菜单
			if($('#J_sonMenu .commonidty-son-detail').eq(_current.index())){
				//显示二级菜单
				$('#J_sonMenu .commonidty-son-detail').eq(_current.index()).show();
			}
		}
	},function(){
		$(this).stop().animate({paddingLeft:'0'},300);		
	})

	//最外层移出初始化
	$('#J_warpMenu').hover(function(){
		},function(){
		$('#J_sonMenu').hide();
		$('.lihoverstyle').removeClass('lihoverstyle');
	})
	//三级菜单事件
	$('#J_home').on('click','li',function(){
		var _current = $(this);
		$('#J_home li').removeClass('active');
		$('#J_sonHome .commonidty-son-ul').hide();
		_current.addClass('active');
		if($('#J_sonHome .commonidty-son-ul').eq(_current.index())){
			$('#J_sonHome .commonidty-son-ul').eq(_current.index()).show();
		}
	})
	//选项卡切换
	$('.tab-right-common').on('click','li',function(){
		var _current = $(this);
		_current.parent().find('li').removeClass('active');
		_current.addClass('active');
	})
}