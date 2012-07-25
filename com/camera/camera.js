// JavaScript Document
$V.package('camera.Camera',function(){
		var Camera = function(arg){
			var __s = {x:0,y:0,z:0,angle:0};
			function Camera(arg){
				
			};
			Camera.prototype.__defineGetter__('__s',function(){return this.__s;});
			Camera.prototype.__defineSetter__('__s',function(){this.__s = str;});
			
			Camera.prototype.__defineGetter__('x',function(){return this.__s.x;});
			Camera.prototype.__defineSetter__('x',function(){this.__s.x = str;});
			
			Camera.prototype.__defineGetter__('y',function(){return this.__s.y;});
			Camera.prototype.__defineSetter__('y',function(){this.__s.y = str;});
			
			Camera.prototype.__defineGetter__('z',function(){return this.__s.z;});
			Camera.prototype.__defineSetter__('z',function(){this.__s.z = str;});
			
			Camera.prototype.__defineGetter__('angle',function(){return this.__s.angle;});
			Camera.prototype.__defineSetter__('angle',function(){this.__s.angle = str;});
			
			Camera.prototype.reset = function(){
					this.x = this.y = this.z = this.angle = 0;
				};
			
			return new Camera(arg);
		};
		
		$V.public('Camera',Camera);	
	});