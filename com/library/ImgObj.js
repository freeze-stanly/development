// JavaScript Document
$A._package('library.ImgObj',function(){
		var ImgClip = function(image){
				var __s = {};
				function ImgClip(image){
					this.image = image;
				};
				ImgClip.prototype.__defineGetter__('__s',function(){return __s;});
				ImgClip.prototype.__defineSetter__('__s',function(str){__s = str;});
				
				ImgClip.prototype.__defineGetter__('w',function(){return this.__s.w;});
				ImgClip.prototype.__defineSetter__('w',function(str){this.__s.w=str});
							
				ImgClip.prototype.__defineGetter__('h',function(){return this.__s.h;});
				ImgClip.prototype.__defineSetter__('h',function(str){this.__s.h = str;});
				
				ImgClip.prototype.__defineGetter__('image',function(){return this.__s.image;});
				ImgClip.prototype.__defineSetter__('image',function(str){this.__s.image = str;});
				
				return new ImgClip(image);
			};
		$V.public('ImgClip',ImgClip);
});