// JavaScript Document


$V.package('Animation.TimeLine',function(){
	//param:{s:{},other:{}}
	/*
		get/set __s
				name
				start
				length
				end
				pointer
				parent
				
		Event	onPlayEnd
		fun		addListenerEvent
				PlayEnd
				
				
	*/
	var Frame = function(arg){
			var __s = {start:0,end:0,length:1,pointer:0};
			function Frame(arg){};
			Frame.prototype.__defineGetter__('__s',function(){return __s;});
			Frame.prototype.__defineSetter__('__s',function(str){__s = str;});
			
			Frame.prototype.__defineGetter__('name',function(){
				return this.__s.name;});
			Frame.prototype.__defineSetter__('name',function(str){
				this.__s.name = str;});
			
			Frame.prototype.__defineGetter__('start',function(){return this.__s.start;});
			Frame.prototype.__defineSetter__('start',function(str){
					this.__s.start = parseInt(str);
					//this.__s.length = this.__s.end-this.__s.start+1;
					//this.__s.end = this.__s.length+this.__s.start-1;
				});
			
			Frame.prototype.__defineGetter__('end',function(){return this.__s.end;});
			Frame.prototype.__defineSetter__('end',function(str){
					this.__s.end = parseInt(str);
					//this.__s.length = this.__s.end-this.__s.start+1;				
				});
			
			Frame.prototype.__defineGetter__('length',function(){return this.__s.length;});
			Frame.prototype.__defineSetter__('length',function(str){
					this.__s.length = parseInt(str);
					//this.__s.end = this.__s.start+this.__s.length-1;
				});
			
			Frame.prototype.__defineGetter__('pointer',function(){return this.__s.pointer;});
			Frame.prototype.__defineSetter__('pointer',function(str){
					var p = parseInt(str),end=this.end;
					this.__s.pointer = p;
					if(p == end && typeof(this.onPlayEnd) == 'function'){
						this.onPlayEnd();
					};
					if(this.onPointerChange){
						this.onPointerChange();
					};
				});
			Frame.prototype.__defineGetter__('parent',function(){return this.__s.parent;});
			Frame.prototype.__defineSetter__('parent',function(str){this.__s.parent = str;});
			
			Frame.prototype.__defineGetter__('onPlayEnd',function(){
					return this.__s.onPlayEnd;
				});
			Frame.prototype.__defineSetter__('onPlayEnd',function(str){
					this.__s.onPlayEnd = str;
				});
			
			
			Frame.prototype.__defineGetter__('onPointerChange',function(){
					return this.__s.onPointerChange;
				});
			Frame.prototype.__defineSetter__('onPointerChange',function(str){
					this.__s.onPointerChange = str;
				});
			
			
			Frame.prototype.addListenerEvent = function(etype,callback){
					this[etype](callback);
				};
			Frame.prototype.PlayEnd = function(callback){
					this.__s.onPlayEnd = callback;
				};
			Frame.prototype.PointerChange = function(callback){
					this.__s.onPointerChange = callback;
				};
			
			
			
			return new Frame(arg);
		};	
	$V.public('Frame',Frame);	
	
	/*
		get/set __s
				name
				start
				length
				end
				pointer
				parent
				motion
				shape
				
	*/	
	var Clip = $V(function(arg){
				this.motion = false;
				this.status = [];
				//this.status[0] = status;
			}).ex(Frame,
				{'motion':{set:function(str){
								this.__s.motion = str;
						   },
						   get:function(){
								return this.__s.motion;
						   },
						},
				 'action':{set:function(str){
								this.__s.action = str;
						   },
						   get:function(){
								return this.__s.action;
						   },
						},
				 'shape':{set:function(str){
								this.__s.shape = str;
						   },
						  get:function(){return this.__s.shape;},
							
						   },
				'status':{
						   set:function(str){
								this.__s.status = str;
							},
						   get:function(){
								return this.__s.status;
							}							
						},
				 'clone':{value:function(){
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
								var __s = clone(this.__s);
								var t = clone(this);
								var tempclone = new Clip();
								t.__proto__ = tempclone.__proto__;	
								t.__s = __s;
								return t;
				 			}
						 },
					'setKeyFrame':{
							value:function(num){
								if(this.start>=num || this.end <= num){
									throw('Frame no exist');
									return;
								};
								
								if(this.motion == true){//补间
									if(this.statt != parseInt(num)){
										this.status[num] = aaaa;
									};
								}else{//非补间
									var cloneobj = this.clone();
									if(this.start == num){
										this.length = 1;
										this.end = this.start;
										cloneobj.start -= 1;
										cloneobj.length -= 1;
									};
									if(this.end == num){
										this.length -=1;
										this.end -= 1;
										cloneobj.start = cloneobj.end =num;
										cloneobj.length = 1;
									};
									if(num>this.start && num<this.end){
										this.end = num;
										this.length = this.start-this.end;
										cloneobj.start = num+1;
										cloneobj.length = cloneobj.end - cloneobj.start;
									};
									
								};
							}
						},
					'revserseStatus':{
							value:function(){
								this.status.reverse();
							}
						},
				}
			);
	$V.public('Clip',Clip);	
	
	var TimeAxis = $V(function(arg){
				this.clipLine=[];
				this.enplay = true;
				this.name = arg.name;
			}).ex(Frame,
				{'pointer':{get:function(){
								return this.__s.pointer;
								},
						    set:function(str){
									var n = this.checkFrameClip(str);
									var target = this.clipLine[n];
									//target.ondraw(str);
									this.__base.pointer = str;
								},
					},
				'z':{
					get:function(){return this.__s.z;},
					set:function(str){this.__s.z = str;}
				},
				'enplay':{get:function(){
								return this.__s.enplay;
								},
						  set:function(str){
									this.__s.enplay = str;
								},
					},
				 'end':{get:function(){
					 			var index = this.clipLine.length-1;
								this.__base.end = index==-1?0:this.clipLine[index].end;
								return this.__base.end;
								},
						set:function(str){
								throw('this is readonly');
								},
					},
				'length':{get:function(){
								this.__base.length = this.__base.end;
								return this.end;
								},
						  set:function(str){
									throw('this is readonly');
								},
					},
				'clipLine':{set:function(str){
										this.__s.clipLine = str;
									},
							get:function(){return this.__s.clipLine;}
					},
				'currentClip':{
						set:function(str){
										this.__s.clipLine = str;
									},
						get:function(){return this.__s.clipLine;}
					},
				'getLastClipIndex':{get:function(){
						var clipLine = this.clipLine,position=-1;
								function isExist(ele,index,array){
									position = index;	
								};
								tempclip.forEach(isExist);
								return position;
							}
					},
				'addClip':{value:function(Clip,num){
								var clip = Clip;
								clipLine = this.clipLine;
								enadd = this.checkExistClip(num,num+clip.length);
								if(enadd == -1){
									clipLine[num] = clip;
									clip.start = num;	
									clip.length = clip.length;	
									clip.end = num +clip.length;					
								}else{
									console.log('target frame existed');
								};
							}
					},//param{clip:CLIP,index:INDEX}
				'removeClip':{value:function(param){
								var clipLine = this.clipLine,
									clipindex = param.index,
									clip = param.clip;
									
								if(!clipindex){
									clipindex = clip?
									checkExistClip(clip.start,clip.end):
									checkExistClip(this.currentClip.start,this.currentClip.end);
								};
								
								delete clipLine[clipindex];
								var lastindex = this.getLastClipIndex+1;
								clipLine.splice(lastindex);
							}
					},//param{clip:CLIP,index:INDEX,mstart:MSTART}
				'moveClip':{value:function(param){
								var clipLine = this.clipLine,
									clipindex = param.index,
									clip = param.clip,
									mstart = param.mstart;
									
								if(!clipindex){
									clipindex = clip?
									checkExistClip(clip.start,clip.end):
									checkExistClip(this.currentClip.start,this.currentClip.end);
								};
								
								var target = clipLine[clipindex];
								var mend = mstart+target.length;
								var cp = this.checkExistClip(mstart,mend);
								//var sp = this.checkFrameClip(mstart);
								//var ep = this.checkFrameClip(mend);
								if(cp == -1 && cp == clipindex){
									target.start = mstart;
								}else{
									console.log('move is failed');	
								};
							}
					},
				'checkExistClip':{value:function(start,end){
							var clipLine = this.clipLine,position=-1;
							function isExist(ele,index,array){
								if((start>=ele.start && start<= ele.end) || ( end >= ele.start && end <= ele.end) || (start < ele.start && end > ele.end)){
										position = index;
										return true;
								};			
							};
							clipLine.some(isExist);
							return position;
						}
					},
				'checkFrameClip':{value:function(FrameNum){
							var  clipLine = this.clipLine,position=-1,targetnum = parseInt(FrameNum)<0?0:parseInt(FrameNum);
		
							function isExist(ele,index,array){
								if((targetnum>= ele.start && targetnum <= ele.end)){	
										position = index;
										return true;
								};			
							};
							clipLine.some(isExist);
							return position;
						}
					},
				'reverseClip':{
							value:function(){
								this.clipLine.reverse();	
							}
					},//param{clip:CLIP,index:INDEX,mstart:MSTART}

				'play':{value:function(){
							this.enplay = true;
						}
					},
				'stop':{value:function(){
							this.enplay = false;
						}
					},
				'gotoAndPlay':{value:function(num){
							this.enplay = true;
							this.pointer = parseInt(num);
						}
					},
				'gotoAndStop':{value:function(num){
							this.enplay = false;
							this.pointer = parseInt(num);
						}
					},
				 'run':{value:function(ctx,num){
					 		var clipLine = this.clipLine;
							var position = this.checkFrameClip(num);
							var temp = clipLine[position];
							var n;
							if(temp){
								n = num-temp.start;
								temp.shape(ctx,num);
							}else{
								console.log('doit='+num);
							};
					 	}
					 }
				});
	$V.public('TimeAxis',TimeAxis);	
});
