mui.init();
	(function($) {
		//阻尼系数
		var deceleration = mui.os.ios?0.003:0.0009;
		$('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration:deceleration
		});

		$.ready(function() {
			//循环初始化所有下拉刷新，上拉加载。

			$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
				var selfs = this;
				console.log(selfs);
				$(pullRefreshEl).pullToRefresh({
					down: {
						// auto: true,
						callback: function() {
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								ul.innerHTML="";
								ul.insertBefore(createFragment(ul, index, 5, true), ul.firstChild);
								self.endPullDownToRefresh();
							}, 1000);
						}

					},
					up: {
						// auto: true,
						callback: function() {
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								ul.appendChild(createFragment(ul, index, 2));
								self.endPullUpToRefresh();
							}, 1000);
						}
					}
				});
			});

			var createFragment = function(ul, index, count, reverse) {
				var length = ul.querySelectorAll('li').length;
				var fragment = document.createDocumentFragment();
				var li;
				
				li = document.createElement('li');
				li.className = 'mui-table-view-cell';

				if (index == 0 ) {
					mui.ajax('shuju1.json',{
						data:{
							username:'username',
							password:'password'
						},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						headers:{'Content-Type':'application/json'},	
						async:false,              
						success:function(data){		
							// 服务器返回响应，根据响应结果，分析是否登录成功；					
               					for(var i = 0; i < data.lists.length; i++){
				                li.innerHTML +='<div class="licon"><div class="grade">8.8</div><div class="lileft"><img class="tx" src="../../images/banner.png" alt=""><div class="mz"><img src="../../images/sex.png" alt=""><span>哈哈哈哈</span></div></div><div class="liright"><h1>看一场电影</h1><ul><li>加勒比海盗</li><li>保利国际影城<span><var>20</var>km</span></li><li><span>今天</span><span>18：00</span><span>AA</span></li></ul></div><div class="times">2017-06-06</div><div class="libottom"><p class=""><var>10</var>人看过</p><p class=""><var>1</var>人报名 <var>1</var>人评论</p></div></div>'
				            	};							           
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							console.log(type);
						}
					});
				}else if(index == 1){
					mui.ajax('shuju2.json',{
						data:{
							username:'username',
							password:'password'
						},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						headers:{'Content-Type':'application/json'},	
						async:false,              
						success:function(data){		
							// 服务器返回响应，根据响应结果，分析是否登录成功；
								
               					for(var i = 0; i < data.lists.length; i++){
				                li.innerHTML +='<div class="licon"><div class="grade">8.8</div><div class="lileft"><img class="tx" src="../../images/banner.png" alt=""><div class="mz"><img src="../../images/sex.png" alt=""><span>哈哈哈哈</span></div></div><div class="liright"><h1>看一场电影</h1><ul><li>加勒比海盗</li><li>保利国际影城<span><var>20</var>km</span></li><li><span>今天</span><span>18：00</span><span>AA</span></li></ul></div><div class="times">2017-06-06</div><div class="libottom"><p class=""><var>10</var>人看过</p><p class=""><var>1</var>人报名 <var>1</var>人评论</p></div></div>'
				            	};							           
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							console.log(type);
						}
					});
				}else if(index == 2){
					mui.ajax('shuju3.json',{
						data:{
							username:'username',
							password:'password'
						},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						headers:{'Content-Type':'application/json'},	
						async:false,              
						success:function(data){		
							// 服务器返回响应，根据响应结果，分析是否登录成功；
								
               					for(var i = 0; i < data.lists.length; i++){
				                li.innerHTML +='<div class="licon"><div class="grade">8.8</div><div class="lileft"><img class="tx" src="../../images/banner.png" alt=""><div class="mz"><img src="../../images/sex.png" alt=""><span>哈哈哈哈</span></div></div><div class="liright"><h1>看一场电影</h1><ul><li>加勒比海盗</li><li>保利国际影城<span><var>20</var>km</span></li><li><span>今天</span><span>18：00</span><span>AA</span></li></ul></div><div class="times">2017-06-06</div><div class="libottom"><p class=""><var>10</var>人看过</p><p class=""><var>1</var>人报名 <var>1</var>人评论</p></div></div>'
				            	};							           
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							console.log(type);
						}
					});
				}else if(index == 3){
					mui.ajax('shuju4.json',{
						data:{
							username:'username',
							password:'password'
						},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						headers:{'Content-Type':'application/json'},	
						async:false,              
						success:function(data){		
							// 服务器返回响应，根据响应结果，分析是否登录成功；
								
               					for(var i = 0; i < data.lists.length; i++){
				                li.innerHTML +='<div class="licon"><div class="grade">8.8</div><div class="lileft"><img class="tx" src="../../images/banner.png" alt=""><div class="mz"><img src="../../images/sex.png" alt=""><span>哈哈哈哈</span></div></div><div class="liright"><h1>看一场电影</h1><ul><li>加勒比海盗</li><li>保利国际影城<span><var>20</var>km</span></li><li><span>今天</span><span>18：00</span><span>AA</span></li></ul></div><div class="times">2017-06-06</div><div class="libottom"><p class=""><var>10</var>人看过</p><p class=""><var>1</var>人报名 <var>1</var>人评论</p></div></div>'
				            	};							           
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							console.log(type);
						}
					});
				}else if(index == 4){
					mui.ajax('shuju5.json',{
						data:{
							username:'username',
							password:'password'
						},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						headers:{'Content-Type':'application/json'},	
						async:false,              
						success:function(data){		
							// 服务器返回响应，根据响应结果，分析是否登录成功；
								
               					for(var i = 0; i < data.lists.length; i++){
				               li.innerHTML +='<div class="licon"><div class="grade">8.8</div><div class="lileft"><img class="tx" src="../../images/banner.png" alt=""><div class="mz"><img src="../../images/sex.png" alt=""><span>哈哈哈哈</span></div></div><div class="liright"><h1>看一场电影</h1><ul><li>加勒比海盗</li><li>保利国际影城<span><var>20</var>km</span></li><li><span>今天</span><span>18：00</span><span>AA</span></li></ul></div><div class="times">2017-06-06</div><div class="libottom"><p class=""><var>10</var>人看过</p><p class=""><var>1</var>人报名 <var>1</var>人评论</p></div></div>'
				            	};							           
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							console.log(type);
						}
					});
				};
					

					
					fragment.appendChild(li);
			
				return fragment;
			};
		});
	})(mui);