// JavaScript Document

$A._import('animation.animationEle');
$A._import('library.Library');
$A.main(function(){
	var Source = $A._clazz.library.Library.Source;
	var ele = $A._clazz.animation.animationEle,line = $A._clazz.animation.TimeLine;
	
	Source.import('img/test.jpg','test');
	Source.import('img/test1.jpg','test1');
	Source.import('img/test2.jpg','test2');
	Source.import('img/test3.jpg','test3');
	Source.import('img/test4.jpg','test4');
	Source.import('img/test5.jpg','test5');
	
	Source.addListenerEvent('onload',function(){
		console.log('resource onload complete');
		var er = this.hadloadsourcelist['test5'];
		var shape = new ele.Shape(er,10,10,100,100,50,50,150,150,function(){
																	//alert('ffff');
																	//Scene.ctx.clearRect(50,50,150,150);
																	this.destory();
																});
		shape.context = Scene.ctx;
		shape.draw();
		//Scene.ctx.drawImage(er,i--,i--);
	});
	
	
		
	var dd = function(param,fun){
			var __setting = {};
			var dc = function(param){console.log('||'+param);};
			/*dc.prototype.__defineGetter__('name',function(){return __setting.name;});
			dc.prototype.__defineSetter__('name',function(str){
											__setting.name = str;
								});*/
			for(var i in fun.prototype){
				dc.prototype[i] = fun.prototype[i];
			};
			return new dc(param);
		};
	
	var f = function(){};
	f.prototype.__defineGetter__('name',function(){return __setting.name;});
	f.prototype.__defineSetter__('name',function(str){
											__setting.name = str;
								});
	
	var ddd = new dd('ffff',f);
	console.log(ddd.name);
	var ddc = new dd('bbbb',f);
	ddc.name = '12121212';
	console.log(ddc.name);
	console.log(ddd.name);
	
	/*var dd = function(param,fun){
		var _setting=param ||{};
		var f = function(){
				fun();
			};
		f.prototype = fun.prototype;
		f.prototype.constructor = new dd();
		return new f();
	};
	var dc = function(param){console.log('||'+param);};
			dc.prototype.__defineGetter__('name',function(){
				return __setting.name;
				});
			dc.prototype.__defineSetter__('name',function(str){
											__setting.name = str;
								});
								
	var zz = new dd({name:'ffff'},dc);
	
	console.log(zz.name);
	zz.name = '22323';
	console.log(zz.name);*/
	
	
	
	var Stage = new ele.Stage({W:500,H:500});
	var Scene = new ele.Scene({id:'scene1'});

	
	
	//var movie = new ele.MovieClip({name:'Mc'});
	
	Stage.addScene(Scene);
	var movie = Scene.initMc();

	//Scene.addMc(movie);
	
	var layer = new line.Layer({name:'Layer1'});
	var time = new line.Time({name:'time'});
	
	var clip = new line.Clip({name:'clip',start:2,length:5,shape:[1,2,3,4,5]});
	var erc = new ele.Shape(
		function(){
				console.log('clip2 stop');
			}
	);
	erc.context = Scene.ctx;
	var clip2 = new line.Clip({name:'clip2',start:9,length:1,shape:erc});
	var clip1 = new line.Clip({name:'clip1',start:11,length:3,shape:[6,7,8]});
	
	time.addClip(clip);
	time.addClip(clip1);
	time.addClip(clip2);
	layer.addTimeAxis(time);
	movie.addLayer(layer);
	
	var ss = new Image();
	ss.src = 'img/test.jpg';
	var i = 10;
	ss.onload = function(e){
			Scene.ctx.drawImage(ss,i--,i--);
		};
		
		
	var s = window.setInterval(function(){
		movie.run.call(movie);
		//movie.pointer += 1;
		//console.log('pointer='+movie.pointer);
	},30);
	//movie.pointer = 3;
	//movie.play();
	//movie.play.call(movie)
	
	/*var s = window.setInterval(function(){
		movie.play.call(movie);
		movie.pointer += 1;
	},30);*/
	
	
	/*var clip3 = clip.setKeyFrame(5);
	time.addClip(clip3);
	
	var clip2 = clip.Clone(clip);
	clip2.__setting.shape = [5,5,5,5,5];
	clip2.replaceShape([9,10,11,12,13]);*/
	
	
	

	
	
	//console.log(tim.start);
});