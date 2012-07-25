// JavaScript Document
$V.import('com.animation.TimeLine');
$V.import('com.contrl.PlayCtrl');

$V.package('Animation.AnimationEle',function(){
	var TimeAxis=$V.ns.Animation.TimeLine.TimeAxis,Ctrl = $V.ns.Contrl.PlayCtrl.Ctrl;
	
	var DisplayObj = function(arg){
			console.log(arguments);
			var __s = {
				Matrix:[0,0,0,0,0,0,0,0,0,0,true,0],
				};
			function DisplayObj(arg){
					
				};
			DisplayObj.prototype.__defineGetter__('__s',function(){return __s;});
			DisplayObj.prototype.__defineSetter__('__s',function(str){__s = str;});
			
			DisplayObj.prototype.__defineGetter__('x',function(){return this.__s.Matrix[0];});
			DisplayObj.prototype.__defineSetter__('x',function(str){this.__s.Matrix[0] = str;});
							
			DisplayObj.prototype.__defineGetter__('y',function(){return this.__s.Matrix[1];});
			DisplayObj.prototype.__defineSetter__('y',function(str){this.__s.Matrix[1] = str;});
						
			DisplayObj.prototype.__defineGetter__('w',function(){return this.__s.Matrix[2];});
			DisplayObj.prototype.__defineSetter__('w',function(str){this.__s.Matrix[2]=str});
						
			DisplayObj.prototype.__defineGetter__('h',function(){return this.__s.Matrix[3];});
			DisplayObj.prototype.__defineSetter__('h',function(str){this.__s.Matrix[3] = str;});
							
			DisplayObj.prototype.__defineGetter__('alpha',function(){return this.__s.Matrix[4];});
			DisplayObj.prototype.__defineSetter__('alpha',function(str){this.__s.Matrix[4] = str;});
							
			DisplayObj.prototype.__defineGetter__('rotation',function(){return this.__s.Matrix[5];});
			DisplayObj.prototype.__defineSetter__('rotation',function(){this.__s.Matrix[5] = str;});
							
			DisplayObj.prototype.__defineGetter__('flipX',function(){return this.__s.Matrix[6];});
			DisplayObj.prototype.__defineSetter__('flipX',function(){this.__s.Matrix[6] = str;});
							
			DisplayObj.prototype.__defineGetter__('filpY',function(){return this.__s.Matrix[7];});
			DisplayObj.prototype.__defineSetter__('filpY',function(){this.__s.Matrix[7] = str;});
							
			DisplayObj.prototype.__defineGetter__('scaleX',function(){return this.__s.Matrix[8];});
			DisplayObj.prototype.__defineSetter__('scaleX',function(){this.__s.Matrix[8] = str;});
							
			DisplayObj.prototype.__defineGetter__('scaleY',function(){return this.__s.Matrix[9];});
			DisplayObj.prototype.__defineSetter__('scaleY',function(){this.__s.Matrix[9] = str;});
							
			DisplayObj.prototype.__defineGetter__('visible',function(){return this.__s.Matrix[10];});
			DisplayObj.prototype.__defineSetter__('visible',function(){this.__s.Matrix[10] = str;});
			
			DisplayObj.prototype.__defineGetter__('z',function(){return this.__s.Matrix[11];});
			DisplayObj.prototype.__defineSetter__('z',function(str){this.__s.Matrix[11] = str;});
			
			DisplayObj.prototype.__defineGetter__('name',function(){return this.__s.name;});
			DisplayObj.prototype.__defineSetter__('name',function(str){this.__s.name = str;});
			
			DisplayObj.prototype.__defineGetter__('parent',function(){return this.__s.parent;});
			DisplayObj.prototype.__defineSetter__('parent',function(str){this.__s.parent = str;});

			DisplayObj.prototype.render = function(){
				
				};
			DisplayObj.prototype.draw = function(){
				
				};	
			DisplayObj.prototype.clone = function(){
					function clone(parent,child){
									var i,
									toStr = Object.prototype.toString,
									astr = "[object Array]";
										
									child = child || {};
									for(i in parent){
										if(parent.hasOwnProperty(i)){
											if(typeof parent[i] === 'object' && parent[i] != null){
												child[i] = (toStr.call(parent[i]) === astr)?[]:{};
												arguments.callee(parent[i],child[i]);
											}else{
												child[i] = parent[i];
											};
										};
									};
									return child;
								};		
								var __s = DisplayObj(this.__s);
								var t = DisplayObj(this);
								var tempclone = new DisplayObj();
								t.__proto__ = tempclone.__proto__;	
								t.__s = __s;
								return t;
				};
			return new DisplayObj(arg);
		};
	//$V.public('DisplayObj',DisplayObj);	
			
	var DisplayObjContainer = $V(function(){
									this.displayObjList = [];
								}).ex(DisplayObj,
								{
									'displayObjList':{
										get:function(){
											return this.__s.displayObjList;
										},
										set:function(str){
											this.__s.displayObjList = str;
										}
									},
									'addChild':{
										value:function(obj){
											var ddd = obj;
												var displayObjList = this.displayObjList;
												obj.parent = this;
												displayObjList.push(obj);
												obj.z = displayObjList.length -1;											
												//this.sortZ();
												
											}
									},
									'removeDispaly':{value:function(dispalyObj){
												var target = displayObj.z;
												this.displayObjList.splice(target,1);
												this.sort();
											}										
									},
									'sort':{
										value:function(fun){
											var displayObjList = this.displayObjList,length = displayObjList.length;
											if(fun){
												for(var i=0;i<length;i++){
													displayObjList[i].z =i;
												};
											}else{
												displayObjList.sort(fun);
											};
										}
									},
									'insertDisplayObj':{
										value:function(position,dispalyObj){
												this.displayObjList.splice(position,0,displayObj);
												this.sort();
											}	
									},
									'clone':{
										value:function(){
												function clone(parent,child){
													var i,
													toStr = Object.prototype.toString,
													astr = "[object Array]";
														
													child = child || {};
													for(i in parent){
														if(parent.hasOwnProperty(i)){
															if(typeof parent[i] === 'object' && parent[i] != null){
																child[i] = (toStr.call(parent[i]) === astr)?[]:{};
																arguments.callee(parent[i],child[i]);
															}else{
																child[i] = parent[i];
															};
														};
													};
													return child;
												};		
												var __s = DisplayObjContainer(this.__s);
												var t = DisplayObjContainer(this);
												var tempclone = new DisplayObjContainer();
												t.__proto__ = tempclone.__proto__;	
												t.__s = __s;
												return t;
											}
									},
								});
//stage 调用run --> scene-->mc.run-->timeAxis.run-->Ctrl.point 运行shape
	var Stage = $V(function(arg){
		var _this = this;
		if(arg){
			this.w = arg.width || 0 ;
			this.h = arg.height || 0;
			this.z = arg.z || 0;
			this.name = arg.id || null;
			this.target = arg.target || null;
		};
			var contain = document.createElement('div');
			contain.id = this.name;
			contain.style.position = 'relative';
			contain.style.width = this.w+'px';
			contain.style.height = this.h+'px';
			contain.style.zIndex = this.z || 0;
			contain.className = arg.class?arg.class:'';
			if(this.target){
				var target = document.getElementById(this.target);
			}else{
				var target = document.body;
			};
			target.appendChild(contain);
			this.disObj = contain;
			
			function mcPlay(num){
				var dlist = _this.displayObjList,dlistlength = dlist.length;
				for(var i = 0;i<dlistlength;i++){
					var mc = dlist[i].displayObjList[0];
					if(mc.displayObjList.length>0){
						mc.run(dlist[0],num);
					};
				};
			};
					
			this.ctrl = new Ctrl(40,mcPlay);
			
		
		}).ex(DisplayObjContainer,{
			'length':{
					get:function(){
						var dlist = this.displayObjList,dlistlength = dlist.length,length;
						for(var i = 0;i<dlistlength;i++){
							var mc = dlist[i].displayObjList[0];
							if(mc.displayObjList.length>0){
								length = length>mc.length?length:mc.length;
							};
						};
						
						return length;
					}
				},
			'addChild':{value:function(obj){
							this.__base.addChild(obj);
							this.disObj.appendChild(obj.disObj);	
				 		}
				 },
			 'disObj':{
						get:function(){
							return this.__s.disObj;
						},
						set:function(str){
							this.__s.disObj = str;
						}
				},
			 'target':{
				 	get:function(){
						return this.__s.target;
					},
					set:function(str){
						this.__s.target = str;
					}
				},
				'ctrl':{
				 	get:function(){
						return this.__s.ctrl;
					},
					set:function(str){
						this.__s.ctrl = str;
					}
				},
			  'run':{
				  value:function(poin){
					  	//alert(this.length);
					  	this.ctrl.play();
					  /*	 var dlist = this.displayObjList,dlistlength = dlist.length;
						 for(var i=0;i<dlistlength;i++){
								 dlist[i].displayObjList[0].play(poin);
						 };*/
					  }				  
				},
			  'replay':{value:function(){
				  	this.ctrl.replay();
				}},
		      'stop':{value:function(){
				  	this.ctrl.stop();
				}},
			  'pause':{value:function(){
					this.ctrl.pause();
				}}
		});
	$V.public('Stage',Stage);
	
	var Scene = $V(function(arg){
		if(arg){
			this.w = arg.width || 0 ;
			this.h = arg.height || 0;
			this.z = arg.z || 0;
			this.name = arg.name || null;
		};
		
			var canvas = document.createElement('canvas');
			canvas.id = this.name;
			canvas.width = this.w;
			canvas.height = this.h;
			canvas.style.zIndex = this.z;
			canvas.style.position = 'absolute';
			canvas.style.top = '0px';
			canvas.style.left = '0px';
			this.disObj = canvas;
			
		}).ex(DisplayObjContainer,{
			'disObj':{
				get:function(){
					return this.__s.disObj;
				},
				set:function(str){
					this.__s.disObj = str;
				}
			},
		});
		
		
	$V.public('Scene',Scene);
	
	
		var MovieClip = $V(function(arg){
			if(arg){
				this.w = arg.width || 0 ;
				this.h = arg.height || 0;
				this.z = arg.z || 0;
				this.name = arg.name || null;	
				this.x = arg.x || 0;
				this.y = arg.y || 0;
				this.Layer = [];
				this.pointer = 0;
			};
		}).ex(DisplayObjContainer,{
			'alpha':{
					get:function(){return this.__s.alpha;},
					set:function(str){this.__s.alpha = str;}
				},
			'Layer':{
					get:function(){return this.__s.Layer;},
					set:function(str){this.__s.Layer = str;}
				},
			'pointer':{
					get:function(){return this.__s.pointer;},
					set:function(str){this.__s.pointer = str;}
				},
			'addLayer':{
						value:function(layername){
							if(typeof(layername) == 'string'){
								var axis = new TimeAxis({name:layername});
								this.__base.addChild(axis);
							}else{
								this.__base.addChild(layername);
							};
						}
				},
			'removeLayerByName':{
					value:function(layername){
							this.__base.removeDispaly(this.getLayerByName(layername));
					}
				},
			'getLayerByName':{
					value:function(layername){
							var dList = this.displayObjList;dListlength = dList.length,index=null;
							check:for(var i=0;i<dListlength;i++){
								if(dList[i].name == layername){
									index = i;
									return dList[i];
								};
							};
							
						}
				},
			'length':{
					get:function(){
						var dList = this.displayObjList;dListlength = dList.length,length=0;
						dList.forEach(
							function printElt(element, index, array) {
								var next = array[index+1]?array[index+1].end:0; 	
								var current = element.end;
								if(next>0){
									if(current > next){
											length = current;	
									}else if(current < next ){
											length = next;	
									};
								}else{
									length = length>current?length:current;
								};
							}
						);
						return length;
					}
				},
				
			/*'addClipToChild':{
					value:function(clip,layername,num){
							var axis = this.getChildById(layername);
							axis.addClip(clip,num);
						}
				},
			
			'addChild':{
					value:function(clip,layername,num){
							axis.addClip(clip,num);
				 		}
				},
			'getChildById':{
					value:function(layername){
						var dList = this.displayObjList;dListlength = dList.length,index;
						check:for(var i=0;i<dListlength;i++){
							if(dList[i].name == layername){
								index = i;
								break check;
							};
						};
						return dList[index];
					}
				},*/
			'run':{
					value:function(ctx,point){
						//if(point == 100){alert(new Date()-st);	};
						
						
						var length = this.length,_this=this;
						this.pointer = point>length?point%length:point;
						var dList = this.displayObjList;dListlength = dList.length;
						for(var i=0;i<dListlength;i++){
							var timeaxis = dList[i];
							if(timeaxis.clipLine.length>0){
								var eee = window.setTimeout(function(){
									timeaxis.run(ctx,_this.pointer);
								},0);
								
							};
						};
					
					}
				}
		});
		
	$V.public('MovieClip',MovieClip);	
	
	var Graphic = $V(function(arg){
		
		}).ex(DisplayObjContainer,{
			
			
		});
	$V.public('Graphic',Graphic);
	
	var Shape = $V(function(arg){
		
		}).ex(DisplayObjContainer,{
			
			
		});
	$V.public('Shape',Shape);
});