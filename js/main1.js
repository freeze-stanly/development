// JavaScript Document
//$V.import('com.animation.TimeLine');
$V.import('com.animation.AnimationEle');
$V.import('com.contrl.PlayCtrl');
$V.import('com.resouceManage.resLoadManage');
$V.import('com.library.Library');
$V.import('com.camera.Camera');


var st = new Date();
$V.main(function(){
	
	var TL =$V.ns.Animation.TimeLine,
		AE = $V.ns.Animation.AnimationEle,
		CTL=$V.ns.Contrl.PlayCtrl,
		LIB=$V.ns.Library.Library,
		RLM = $V.ns.resouceManage.resLoadManage
		;
		
		
	var Clip = TL.Clip,
		TimeAxis = TL.TimeAxis,
		Stage = AE.Stage,
		Scene = AE.Scene,
		Ctrl = CTL.Ctrl,
		MovieClip = AE.MovieClip,
		Source = LIB.Source,
		ImgLoadManage = RLM.ImgLoadManage
		;
	
		var img = ImgLoadManage();
		img.addResour({test:'img/test.jpg',
								 test1:'img/test1.jpg',
								 test2:'img/test2.jpg',
								 test3:'img/test3.jpg',
								 test4:'img/test4.jpg'
								}).onLoad = function(rr){
									console.log(rr);
									console.log('onLoad finished');
									
									};
		
		function test(ctx,n){
			console.log('testA'+n);	
		};
		function test1(ctx,n){
			console.log('testZ'+n);	
		};
		
		var sss = new Stage({width:500,height:500,z:0,class:'canvasbg',id:'stage'});
		
		
		var er = new Scene({width:500,height:500,z:1,name:'scene1'});
		var eer = new Scene({width:500,height:500,z:1,name:'scene2'});
		sss.addChild(er);
		sss.addChild(eer);
		
		var mc1 = new MovieClip({name:'mc1'});
		mc1.addLayer('we');
			
		var mc2 = new MovieClip({name:'mc2'});
		mc2.addLayer('rr');
		mc2.addLayer('tt');
		
		var cp1 = new Clip();
		cp1.name = 'cp1';
		cp1.length = 5;
		var cp2 = new Clip();
		cp2.name = 'cp2';
		cp2.length = 10;
		
		cp1.shape = test;
		cp2.shape = test1;
		
		
		//mc1.addChild(cp1,'we',10);
		//mc2.addChild(cp2,'rr',30);
		mc1.getLayerByName('we').addClip(cp1,10);
		mc2.getLayerByName('rr').addClip(cp2,30);

		//alert(mc1.length);
		//alert(mc2.length);
		er.addChild(mc1);
		eer.addChild(mc2);
		//var cc = new Ctrl(40,sss);
		
		//alert(sss.length);
		sss.run();
	});
	
