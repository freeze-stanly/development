// JavaScript Document
/*
	static Source 资源管理类
	
	addListenerEvent 事件监听
	
	Event onload 当外部的图片资源都被LOAD完成后开始 
*/

$V.package('Library.Library',function(){

					var Source = {unloadsourcelist:[],
								  hadloadsourcelist:{}
								 };
					Source.import =function(path,name){
							var img = new Image();
							img.src = path;
							img.name = name;
							this.unloadsourcelist.push(img);
						};
					Source.addListenerEvent = function(eventType,callback){
							Source[eventType](callback);
						};
					Source.onload = function(callback){
						var _this = this,
							hadloadsourcelist = this.hadloadsourcelist,
							unloadsourcelist = this.unloadsourcelist,
							unloadsourcelistlength = unloadsourcelist.length,
							num=0;
						for(var i=0;i<unloadsourcelistlength;i++){
							var currentsource =this.unloadsourcelist.shift();
							currentsource.onload = function(e){
								_this.hadloadsourcelist[e.target.name] = e.target;
								num+=1;
								if(num == unloadsourcelistlength){
									callback.call(_this);
								};
								//Source.onload(callback);
							};
						};
					};		
			$V.public('Source',Source);
	 
});
