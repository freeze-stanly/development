// JavaScript Document
var $V = (function(){
		var root = {},//命民空间的根
		importlist=[],//import script list
		hadloadlist = [],//已经LOAD完成的SCRIPT
		initlist=[],//init script list
		currentspace,//当前空间
		sourcelib = {},
		//scriptloaded = true,
		mainfun;
			
		var $V = function(param){
				return new $V.fn.init(param);
			};
		$V.fn = $V.prototype={
				constructor:$V,
				init:function(param){this.obj = param;},
				addListenerEvent:function(eventtype,callback){
						this[eventtype](callback);
					},
				get ns(){return root;},
				get imglib(){return sourcelib;},
				declareNs:function(path){
						var r = this.ns,nspath = path.split('.'),nspathlength = nspath.length;
						for(var i=0;i<nspathlength;i++){
								if(!r[nspath[i]]){
									r[nspath[i]] = {};
								};
								r = r[nspath[i]];
							};
						return r;
					},
				
			};
		var sn = {
				implement:function(param){//方法继承接口或对象继承接口 可多接口继承
					this.obj.Interface = arguments;
				},
				ex:function(param,pro){
					
					var obj = this.obj,
					fun = param,
					defaultPro = pro;

					var fu = function(arg){
							var o = obj;
							var f = fun;
							
							/*o.prototype = new f(arg);
							o.prototype.constructor = o;
							o.prototype.__base = o.prototype.__proto__;
							var temp = new o(arg);
							Object.defineProperties(temp,defaultPro);
							*/
							var dt = new f(arg);
							Object.defineProperties(dt,defaultPro);
							o.prototype= dt;
							o.prototype.constructor = o;
							o.prototype.__base = o.prototype.__proto__;
							var temp = new o(arg);
							//Object.defineProperties(temp,defaultPro);
																	
							return temp;
						};	
					return fu;
				},
			};
		$V.fn.init.prototype = $V.fn;
		for(var i in sn){
			$V.fn.init.prototype[i] = sn[i];
		};
/*		function imgload(e){
			imgnumload+=1;
			imgloaded =imgnumload == imgnum?true:false;
			if(scriptloaded==true && imgloaded== true){
				mainfun();
			};
		};*/
		$V.extend = $V.fn.extend = function(param){
				var _this =this;
				for(var i in param){
					_this[i] = param[i];
				};
			};
		$V.extend($V.fn);//继承有参数时候的FUN
		
		$V.extend({//无参数时独有的FUN
			
			/*name param return 
			{
			 	name:[param return]，
				name:[param return]
				
			 	ex:start:['aa,bb,cc,ss','fff'] 接口定义了个start方法 'aa,bb,cc,ss'方法接收的参数，'fff' 方法返回对象
			}*/
			nInterface:function(param){
				var Iinstance = function(){};
				for(var i in param){
					var fun = Iinstance.prototype[i] = function(){
															throw '接口未实现'+i;
													};
					fun.arg = param[i][0];//方法的参数记录
					fun.ret = param[i][1];//方法return的记录
				};
				return Iinstance;
			},
			//检查Interface 传入OBJ 或是FUN
			checkInterface:function(obj){
				var Interface = obj.Interface;//多个接口对象数组
				if(Interface){
					for(var i in Interface){
						var singleInterface = Interface[i];//单个接口
						for(var z in singleInterface){
							var intfun = singleInterface[z];//单个接口的单个方法
							if(obj[z]){//对象有着方法
								var objfunstring = obj[z].toString();
								var arg = objfunstring.indexOf('('+ intfun.arg+'){');
								var ret = objfunstring.lastIndexOf('return '+ intfun.ret);
								if(arg == -1 || ret == -1){
									return intfun();
								};
								
							}else{//对象无接口中定义的方法
								return intfun();
							};
						};
					};
				};
			},

			package:function(ns,fun){
				var task = initlist,tasklength = task.length,en=true;
				for(var i = 0;i<tasklength;i++){
					if(ns == task[i]){
						en = false;
						task.splice(i,1);
						task.unshift(ns);
						break;
					};
				};
				if(en){
					task.unshift(ns);
					var currentns = this.declareNs(ns);
					currentns['init'] = fun;
					console.log(root);
				};
			},
			import:function(){
				var _this = this,arg = arguments,arglength = arg.length,hadloadlistlength = hadloadlist.length,enable = true;
				//scriptloaded = false;
				for(var i=0;i<arglength;i++){
					var argEle = arg[i];
					var url = argEle.replace(/\./ig,'/') +'.js';	
									
					check:for(var z=0;z<hadloadlistlength;z++){
						 if(hadloadlist[z] == arg[i]){
								enable = false;	
								hadloadlist.push(hadloadlist[z]);
								hadloadlist.splice(z,1);
								break check;
						 };
					};
					if(enable){
							var s = document.createElement('script');
							s.src = url;
							importlist.push(s);
							hadloadlist.push(argEle);
					};
				};					
			},
/*			importImg:function(path,name){
				imgloaded = false;
				imgnum+=1;
				var lib = this.imglib;
				var img = new Image();
				img.src = path;
				img.name = name;
				lib[name] = img;
				img.onload=imgload;
			},*/
			main:function(callback){
				mainfun = callback;
				
				var importtask = importlist,importtasklength = importtask.length,task=initlist;

				function scriptLoad(e){
					if(e)document.body.removeChild(e.target);
					if(importtask.length >0){
						var s= importtask.shift();
						document.body.insertBefore(s,null);
						s.onload = arguments.callee;
					}else{
						//task.reverse();
						do{
							var path = task.shift().split('.'),pathlength = path.length,ns = root;
							for(var i =0;i<pathlength;i++){
								ns = ns[path[i]];
							};
							currentspace = ns;
							ns['init']();
							delete ns['init'];
						}while(task.length != 0);
						//scriptloaded = true;
						//if(scriptloaded==true){
							callback();
						//};
					};
				};
				scriptLoad();
			},
			public:function(ns,obj){
				currentspace[ns] = obj;
			},
			extendFun:function(father){
				
			},
			extendMod:function(fun,constr){
				var father = new fun();
				constr.call(father);
			}
		});
		return $V;
	})();