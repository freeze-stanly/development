// JavaScript Document
$V.package('resouceManage.resLoadManage',function(){
	
	
		var ImgLoadManage = function(){
			var __s = {
				staticResourList:{}
				};
			function ImgLoadManage(){
				
				};
				
			ImgLoadManage.prototype.__defineGetter__('__s',function(){return __s;});
			//ImgLoadManage.prototype.__defineSetter__('__s',function(str){__s = str;});
			
			ImgLoadManage.prototype.__defineGetter__('staticResList',function(){return this.__s.staticResourList;});
			ImgLoadManage.prototype.__defineSetter__('staticResList',function(str){this.__s.staticResourList = str;});
			//
			ImgLoadManage.prototype.addResour = function(obj){
					return new loadBlock(obj);
				};
			
			return new ImgLoadManage();
		};
		$V.public('ImgLoadManage',ImgLoadManage);
		
		var loadBlock = function(obj){
				var __s = {
					onload:{},
				};
				function loadBlock(){
				
				};
				
				loadBlock.prototype.__defineGetter__('__s',function(){return __s;});
				loadBlock.prototype.addListenerEvent = function(ev,callback){
					this[ev] = callback;
					var _this = this;
					
				};
				
				loadBlock.prototype.__defineSetter__('onLoad',function(str){
					var _this = this;
					
					var setTimeOut = window.setTimeout(function(){
									var z=0;
									var t = 0; 
									console.log(obj);
									for(var i in obj){
									
										var img = document.createElement('img');
										img.src = obj[i];
										obj[i] = img;
										console.log(obj[i]);
										z+=1;
										obj[i].onload=function(){
												t+=1;
												if(t == z){
													str(obj);	
												};
										};		
									};
						},0);
				});
				
				return new loadBlock();
			};
		
	});