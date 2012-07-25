// JavaScript Document

/*
	function InterFace(){
			this.perp = ;
			this.func = 
		};
		
	接口 
	设计: Interface 类生成一个class 内包含  
				    prop 		this.value
					function 	方法名 参数 return 变量
		 生成一个function 将接口定义的方法和属性赋予function
							|	 
		 				function 继承
		 					|
						自定义prototype
							|
						create实例
		 					|
						check Interface
		
		Interface 定死接口中规定的
					  function name
					  param 参数名称
					  return 变量名
					  
		 
		$A.include 收集需要被导入的js文件
		通过addListenerEvent 监听include 文件的装载完成
		之后运行include的JS文件中.类方法.获取.类方法中的定义的类
		通过将获取的类..转给WINDOWS对象
		实现全局..
		
		接口实现
		ex
		var Itest = $A.nInterface({a1:['aa,ba','ca'],
						   a2:['cc,dd','er']
						 },'TimeLine.Itest');
						 
	
		var Itest1 = $A.nInterface({a3:['aa,ba','ca'],
								   a2:['zz,ef','ae']
								 },'TimeLine.Itest1');
		var eparent = function(){};
		eparent.prototype.cc = function(){alert('cccccc');};
		var eadf = $A.nClazz(function(){
					alert('y');
				},eparent,[Itest]);
		eadf.prototype.a1 = function(aa,ba){
					return ca;
			};	
		eadf.prototype.a2 = function(cc,dd){
					return er;
			};	
				
		var tt = $A.nInstance(eadf);
		
		var eeer = new eadf();
		eeer.cc();
		eeer.a3();
		
		
		方法的_path用以记录Interface的 具体路径
										
*/
var $A = (function(){
		var $A = function(param){
				return new $A.fn.init();
			},
			loadbool = true,//第一次load
			tempspace,
			importtaskpoint,
			beforespace,
			clazzinit=[],
			mainfun
			;
		$A.fn = $A.prototype = {
				constructor:$A,
				init:function(){
						
					},
/*				importLoad:function(callback){					
					var todo = this._importtask,_this = this,todolength = todo.length,z = 0;
					function lastElement(ele,index,array){
								//ele.addEventListener('load',loadComplete,false);
								ele.onload = loadComplete;
						}; 
					todo.forEach(lastElement);
					function loadComplete(e){
							e.target.removeEventListener('load',loadComplete,false);
							z +=1;
							console.log(z);
							if(z == todolength){
								delete _this._includelist;
								var tasklist = _this._importtask;
								var tasklistlength = tasklist.length;
								tasklist.reverse();
								for(var i=0;i<tasklistlength;i++){
									//window.setTimeout(tasklist.shift()(),0);								
									var ere = tasklist.shift();
									ere();
								};
								delete _this._tasklist;
								//window.setTimeout(callback,5000);
								callback();
							};
					};
				},*/
				addListenerEvent:function(eventString,callback){
					this[eventString](callback);	
				},
				/*_import:function(){
						if(!this._includelist){
								this._includelist = new Array();
							};
					//if 同时 import 多个
					for(var i in arguments){
						var url = arguments[i].replace('.','/');
						var templist = this._includelist;
						var addEnable = true;
						
						function isExist(ele,i,array){
							return (url == ele._path);
						};
						addEnable = templist.some(isExist);
											
						if(addEnable == false){
							//this.__setting.layername = str;
							var s = document.createElement("script");
							s.src = 'lib/'+url+'.js';
							s._path = url;
							this._includelist.push(s);
							document.body.insertBefore(s);
							//s.onload=aa;
						};
					};
					
					function aa(e){
						console.log(e);
					};	
				},*/
				
			
				
				
			};
		$A.fn.init.prototype = $A.fn;
		$A.extend = $A.fn.extend = function(param){
				var _this = this;
				for(var i in param){
					_this[i] = param[i];
				};
			};
		$A.extend($A.fn);
		$A.extend({
			/*
				当2个SPACE下游相同的function 检测时候提示。选择信息
			*/
			nInstance:function(namespace,param){
				
				//实例化时候。检查INTERFACE
				function checkIntface(instance,Ifun){
						for(var i in Ifun){
							var funstring = instance[i].toString();
							var start = funstring.indexOf('function ('+ Ifun[i][0] +')');
							var end = funstring.lastIndexOf('return ' + Ifun[i][1]);
							if(start == -1 || end == -1){
								throw '接口未实现';
							}else{
								return instance;	
							};
						};
				};
					/*if(typeof(namespace) == 'function'){
						var dddd = new namespace(param);
					}else{
						var dddd = new ($A.getFun(namespace))(param);	
						//var zzzz = new dddd(param);
					};*/
					
					var target =typeof(namespace) == 'function'? new namespace(param):new ($A.getFun(namespace))(param);
					target._path = namespace._path;
					return namespace._path || namespace._path == ''?checkIntface(target,namespace._fun):target;		
				
				//实例化时候传入一个方法
				/*if(typeof(namespace) == 'function'){
					var target = new namespace(param);
					target._path = namespace._path;
					return namespace._path || namespace._path == ''?checkIntface(target,namespace._fun):target;			
				}else{;	
						var target =typeof(namespace) == 'function'? new namespace(param):$A.getFun(namespace);
						target._path = namespace._path;
						return namespace._path || namespace._path == ''?checkIntface(target,namespace._fun):target;		*/
						
					//实例化是接受的是string
					/*var space = namespace.split('.'),spacelength = space.length,targetspace = $A._clazz;			
					if(spacelength >1){//namespace 接受的只是string格式的类名
						for(var i=0;i<spacelength;i++){
							targetspace = targetspace[space[i]];
						};
						var target = new targetspace(param);
						target._path = namespace._path;
						return targetspace._path || targetspace._path == ''?checkIntface(target,targetspace._fun):target;	
					}else{//namespace接受的是string格式的绝对类路径
						var somepath = $A.absolutPath(namespace);
						throw somepath;*/
						/*var samespace = new Array(),muspace='';
						findspace(targetspace);
						
						function findspace(obj){
						  findloop:for(var i in obj){
									if(typeof(obj[i]) == 'object'){
										muspace += i +'.';
										var sonspace = obj[i];
										findspace(sonspace);
									}else if(typeof(obj[i]) == 'function' && i == namespace){
										samespace.push(muspace += i);
										muspace = '';
										break findloop;
										//return obj[i];
									};	
								};
						  muspace = '';
							};
						
						var samespacelength = samespace.length;
						if(samespacelength >1){
							throw '命名空间冲突' + samespace.toString();
						}else if(samespacelength<=0){
							throw '无此类'
						}else{
							return $A.nInstance(samespace[0],param); 
						};	*/					
					//};
				//};
			},
			/*
				name param return 
				{
				 name:[param return]
				 name:['aa,bb,cc,ss','fff']
				}
			*/
			nInterface:function(param,space){
				var _throw = function(){
						throw '接口未实现';
					};
				var result = function(){};
				var fun = result._fun = {};
				var path = result._path =  space;
				for(var i in param){
					result.prototype[i] = _throw;
					fun[i] = param[i];
				};
				//result.fun = param;
				return result;
			},
			/*
				param.child 
				param.Interface []被继承接口 接口可多个
				param.parentClass[]被继承的父类
				生成新的类
			*/
			newClazz:function(child,parent,Interface){
				var arglength = arguments.length;				
				var implement = function(ch,intface){
						var intfacelength = intface.length;
						if(Array.isArray(intface) && intfacelength >0){
							var fun = ch._fun = {};
							var path = ch._path = [];
							for(var i=0;i<intfacelength;i++){
								var intfaceprototype = intface[i].prototype;
								var intfacefun = intface[i]._fun;
								path.push(intface[i]._path);
								for(var z in intfaceprototype){
									if(!ch.prototype[z]){
										ch.prototype[z] = intfaceprototype[z];
									};
									fun[z] = intfacefun[z];
								};
							};
						};
						return ch;
					};
				
/*				var implement = function(ch,intface){
						for(var i in intface){
							if(!ch.prototype[i]){
								ch.prototype[i]= intface[i];	
							};
						};
						return ch;
					};*/
				var extend = function(ch,pa){				  
						  var F = function () {};
						  F.prototype = pa.prototype;
						  ch.prototype = new F();
						  ch.prototype.constructor = ch;
						  ch._base = pa.prototype;
						  return ch;
					};
				switch(arglength){
					case 1:
						return child;
					break;
					case 2:
					var isInterface = typeof(parent) == 'function'?false:true;
						return isInterface == true?implement(arguments[0],arguments[1]):extend(arguments[0],arguments[1]);
					break;
					case 3:
						return 	implement(extend(arguments[0],arguments[1]),arguments[2]);			
					break;	
				};
			},
			/*类名转换出绝对路径
			  范围数组。为针对有多了路径
			*/
			absolutPath:function(funname){
				var clazz = this._clazz,result='';
				findName(clazz);
				function findName(obj){
					if(obj[funname] && (typeof(obj[funname]) == 'function')){
						result+=funname +'||';
					}else{
						for(var i in obj){
							arguments.callee(obj[i]);
							result += i;
						};
					};
				};
				throw result;
			},			
/*			absolutPath:function(namespace){
					var space = namespace.split('.'),spacelength = space.length,samespace = new Array();
					if(spacelength==1){
						var muspace='',targetspace = $A._clazz,targetspacelength = targetspace.length;
							findspace(targetspace);
							function findspace(obj){
							  findloop:for(var i=0;i<targetspacelength;i++){
										if(typeof(obj[i]) == 'object'){
											muspace += i +'.';
											var sonspace = obj[i];
											findspace(sonspace);
										}else if(typeof(obj[i]) == 'function' && i == namespace){
											samespace.push(muspace += i);
											muspace = '';
											break findloop;
											//return obj[i];
										};	
									};
							  muspace = '';
							};
					}else{
						samespace.push(namespace);
					};
					return samespace; 
						/*var samespacelength = samespace.length;
						if(samespacelength >1){
							throw '命名空间冲突' + samespace.toString();
						}else if(samespacelength<=0){
							throw '无此类'
						}else{
							return $A.nInstance(samespace[0],param); 
						};*/	
				//},*/
/*			_package:function(package,param){
				var clazz =this._clazz = !this._clazz?{}:this._clazz,nspace = package.split('.'),nspacelength = nspace.length;
				for(var i=0;i<nspacelength.length;i++){
					if(class[!nspace[i]]){
						clazz[nspace[i]] = {};
					};
				};	
				
			},*/
			//_import 将个任务添加到队伍列表.在importLoad后统一执行
			_package:function(package,param){
					var clazz =this._clazz = !this._clazz?{}:this._clazz,nspace = package.split('.'),nspacelength = nspace.length,fun;
					//this._tasklist = !this._tasklist?new Array():this._tasklist;//任务队列
					tempspace = package;
					fun = param();
					fun.package = package;
					//this._tasklist.push(param);
					var tempclazz;
					for(var i=0;i<nspacelength;i++){
						if(!clazz[nspace[i]]){
							clazz[nspace[i]] = {};
						};
						tempclazz = clazz = clazz[nspace[i]];
					};
					tempclazz.init = fun;
			},
			_import:function(){
					var _this = this,arg = arguments,arglength = arg.length;
					var importtask = this._importtask = this._importtask?this._importtask:[];

					if(tempspace){
						if(tempspace != beforespace){
							beforespace = tempspace;
							importtaskpoint = [];
							importtask.push(importtaskpoint);
						}
							for(var i=0;i<arglength;i++){
								importtaskpoint.push(arg[i]);
							};	
						
					}else{
						for(var i=0;i<arglength;i++){
								importtask.push(arg[i]);
						};	
					};
					if(loadbool == true){
						_onload();
						loadbool = false;
					};
					
					function _onload(e){
					var importtask = _this._importtask,importtasklength=importtask.length,src;
						if(importtasklength != 0){
						//importtask 载入任务列表。当根页面时候 载入是无package
							if(Array.isArray(importtask[0])){
								src = importtask[0].shift();
								if(importtask[0].length <= 0){
									importtask.splice(0,1);
								};
							}else{
								src = importtask.shift();
							};
							
							var init = clazzinit,initlength = clazzinit.length,repeat=-1;
							repeatcheck:for(var i=0;i<initlength;i++){
								if(init[i] == src){
									repeat = i;
									break repeatcheck;
								};
							};
							
							if(repeat==-1){
								clazzinit.unshift(src);
								var s = document.createElement('script');
								s.src = 'lib/'+ src.replace('.','/') +'.js';
								document.body.insertBefore(s,null);
								s.onload = arguments.callee;
							}else{
								var dd = clazzinit[repeat];
								clazzinit.splice(repeat,1);
								clazzinit.unshift(dd);
								arguments.callee();	
							};
						}else{
							//所有LOAD结束
							var clazzlength =clazzinit.length;
							for(var i = 0;i<clazzlength;i++){
								var initpath = clazzinit[i].split('.'),initpathlength= initpath.length,initfun = _this._clazz;
								for(var z = 0;z<initpathlength;z++){
									initfun = initfun[initpath[z]];
								};
								
								_this._tempspace = initfun;
								initfun.init();
								delete initfun.init;
							};
							mainfun();
						};
					};
			},
			_public:function(name,obj){
				this._tempspace[name] = obj;
			},
			main:function(fun){
				mainfun = fun;
			},
/*			LibraryPush:function(type,obj){
				var lib = this.lib?this.__setting.lib:{};
				switch(type){
					case 'img':
						lib['img'][obj.name] = obj;
					break;
					case 'ele':
						lib['ele'][obj.name] = obj;
					break;
					case 'audio':
						lib['audio'][obj.name] = obj;
					break;
				};
			},
			LibraryRemove:function(type,obj){
				var lib = this.__setting.lib;
				switch(type){
					case 'img':
						delete lib['img'][obj.name];
					break;
					case 'ele':
						delete lib['ele'][obj.name];
					break;
					case 'audio':
						delete lib['audio'][obj.name];
					break;
				};
			},*/
			
			});
		return $A;
	})();