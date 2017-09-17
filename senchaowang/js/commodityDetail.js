window.onload = function(){
	//头部菜单栏鼠标移入方法
	productMove();
	//头部城市列表
	cityListPlan();
	//头部购物车
	scCart();
	//头部菜单栏
	menuPlan();
	//选项卡切换
	tabSize();
	//放大镜
	bigImg();
	//滚动固定商品详情 商品评论选项卡
	srcollFiexd();
	//切换商品详情选项卡
	commodityTab();
	//放大镜图片切换
	bigImgTab();
	//商品详情页所有功能jquery方法集合 没有放大镜
	// jqueryPlan();
}

//规格选项卡切换
function tabSize(){
	//for循环绑定
	var tabSizeList = document.querySelectorAll('#J_standardsList .specs-list')
		,price = document.getElementById('J_prices');
	for(var p=0,len = tabSizeList.length;p < len;p++){
		tabSizeList[p].onclick = function(){
			//移除所有选中class
			jquery.removeClass(tabSizeList,'seled');
			//当前添加选中class
			jquery.addClass(this,'seled')
			//改变对应商品价格
			price.innerHTML =  this.getAttribute('data-price');
		}
	}
}
//滚动固定商品详情 商品评论选项卡
function srcollFiexd(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		,resp = document.getElementById('J_tabList')
		,respTop = resp.offsetTop;

		//由于window.onload加载原因会导致刷新页面后不会固定头部  所以做一个判断 可以不需要去理解 
		// if(scrollTop > respTop){
		//  	jquery.addClass(resp,'resp-tabs-list-fixed')
		// }
	window.onscroll = function () {
		//获取滚动条高度
		 scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		 //判断当前滚动高度大于商品列表选项卡的时候执行添加resp-tabs-list-fixed
		 if (scrollTop >= respTop) { 
		 	//防止重复执行里面方法
		 	if(!jquery.hasClass(resp,'resp-tabs-list-fixed')){
		 		jquery.addClass(resp,'resp-tabs-list-fixed')
		 	}
		 } else {
		 	//防止重复执行里面方法
		 	if(jquery.hasClass(resp,'resp-tabs-list-fixed')){
		 		jquery.removeClass(resp,'resp-tabs-list-fixed')
		 	}
		 } 
	}
}
//切换商品详情选项卡
function commodityTab(){
	var respLi = document.querySelectorAll('.resp-tabs-list li')
		,respTabDeatil = document.querySelectorAll('.resp-tabs-container .goods-contab')
		,respTop = document.getElementById('J_tabList').offsetTop;
	for(var i=0,len = respLi.length;i < len;i++){
		respLi[i].index = i;
		respLi[i].onclick = function(){
			//判断当前点击元素是否已点击
			if(!jquery.hasClass(this,'on')){
				//移出所有选中状态
				jquery.removeClass(respLi,'on');
				//隐藏所有列表
				jquery.hide(respTabDeatil);
				//当前元素添加选中class
				jquery.addClass(this,'on');
				//滚动条位置滚动到点击元素的位置
				document.body.scrollTop = respTop-80;
				//判断当前是否有对应导航内容
				if(respTabDeatil[this.index]){
					//显示当前
					jquery.show(respTabDeatil[this.index]);
				}
			}
		}
	}
}

//放大镜图片切换
function bigImgTab(){
	var smallImgWarp =  document.getElementById('J_tabPicture');
	var bigImg = document.querySelector('#J_moveZoom img');
	smallImgWarp.onclick = function(event){
		var ev  = event || window.event;
		var _current = ev.target;
		if(_current.nodeName == 'IMG'){
			if(bigImg.getAttribute('src') != _current.getAttribute('src')){
				bigImg.setAttribute('src',_current.getAttribute('src'));
			}
		}
		return false;
	}
}
//放大镜
function bigImg(){
  	var moveZoom = document.getElementById("J_moveZoom")
  		,bigBox = document.getElementById("J_moveImg")
  		,bigImg = bigBox.getElementsByTagName("img")[0]
  		,moveLayer = document.getElementById('J_moveLayer')
  		,zoomContent  = document.querySelector('.zoom-content')
  		,top = 0	//遮罩层的top值
  		,left = 0	//遮罩层的left值
  		,maxLeft = 0		//鼠标移入x轴
  		,maxTop = 0		//鼠标移入y轴
  		,percentX = 0
  		,percentY = 0;
  	//鼠标移入事件
  	moveZoom.onmouseover = function(){
  		jquery.show(moveLayer);
  		jquery.show(bigBox);
  	}
	//鼠标移出事件
  	moveZoom.onmouseout = function(){
  		jquery.hide(moveLayer);
  		jquery.hide(bigBox);
	}
	//鼠标移动事件
	moveZoom.onmousemove = function(ev){
		var _event = ev || window.event;
		//计算遮罩层left和top值
		left = _event.pageX - zoomContent.offsetLeft - moveLayer.offsetWidth/2;
		top  = _event.pageY - zoomContent.offsetTop - moveLayer.offsetHeight/2;
		maxLeft = moveZoom.offsetWidth - moveLayer.offsetWidth;
		maxTop = moveZoom.offsetHeight - moveLayer.offsetHeight;
		//判断遮罩层移动到临界点
		left = left < 0 ? 0 : left;
		left = left > maxLeft ? maxLeft : left;
		top = top < 0 ? 0 : top;
		top = top > maxTop ? maxTop : top;
		//鼠标移入小图片位置
		moveLayer.style.left = left + 'px';
		moveLayer.style.top = top + 'px';   
        //对应大图位置
		bigImg.style.left =  -(left * bigImg.offsetWidth)/bigBox.offsetWidth+'px';
		bigImg.style.top = -(top * bigImg.offsetHeight)/bigBox.offsetHeight+'px';
	}
}
/*加减商品数量  直接在标签上面添加方法
* type 根据tyep判断走加减方法
* type 1 等于减去商品数量、type 2 等于加商品数量
*/
function numberOperate(type){
	//获取数量
	var num = document.getElementById('J_coomodityNumber')
		,value = parseInt(num.value)
		,stock = document.getElementById('J_stock');
	if(type == 1){
		if(value == 1){
			alert('你够了');
			return;
		}else{
			num.value = value-1;
			stock.innerHTML = parseInt(stock.innerHTML) + 1;
		}

	}else{
		if(num.value == stock.innerHTML){
			alert('你够了');
			return;
		}else{
			num.value = value + 1;
			stock.innerHTML = parseInt(stock.innerHTML) -1;
		}
	}
}

//jquery方法集合
function jqueryPlan(){
	//规格选项卡
	var tabSizeList = $('.standards-list .specs-list')
		price = $('#J_prices')
		current = null;	
	tabSizeList.on('click',function(){
		current = $(this);
		tabSizeList.removeClass('seled');
		current.addClass('seled');
		price.text(current.attr('data-price'));
	})
	//滚动固定商品详情 商品评论选项卡
	var scrollTop = 0
		,resp = $('.resp-tabs-list')
		,respTop = resp.offset().top;
	$(window).scroll(function() {
  		scrollTop = $(window).scrollTop();
  		if(scrollTop > respTop){
  			if(!resp.hasClass('resp-tabs-list-fixed')){
  				resp.addClass('resp-tabs-list-fixed');
  			}
  		}else{
  			resp.removeClass('resp-tabs-list-fixed');
  		}
	});
	//切换商品详情选项卡
	var respLi = resp.find('li')
		currentLi = null
		,respTabDeatil =  $('.resp-tabs-container .goods-contab');
	respLi.on('click',function(){
		currentLi = $(this);
		respLi.removeClass('on');
		currentLi.addClass('on');
		$('html,body').animate({scrollTop:respTop},300);
		respTabDeatil.hide();
		respTabDeatil.eq(currentLi.index()).show();
	})
	//放大镜图片切换
	$('#J_tabPicture').on('click','.zoom-tiny-image',function(event){
		$('#J_moveZoom img').attr('src',$(this).attr('src'));
		$('#J_mouseImg img').attr('src',$(this).attr('src'));
		return false;
	})
}