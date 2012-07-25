// JavaScript Document
$V.package('Contrl.PlayCtrl',function(){
		var Ctrl = function(Fps,drive){
				this.Fps = Fps || 40;
				this.drive = drive;
				this.energy = 0;
				this.serialNum = 0;

			};
		Ctrl.prototype.replay = function(){
				this.stop();
				this.play();
			};
		Ctrl.prototype.play = function(){
				var _this = this;
				window.clearInterval(this.serialNum);
				this.serialNum = window.setInterval(function(){
					_this.drive(_this.energy);
					_this.energy +=1;}
				,this.Fps);
			};
		Ctrl.prototype.stop = function(){
				this.pause();
				this.energy = 0;
			};
		Ctrl.prototype.pause = function(){
				window.clearInterval(this.serialNum);
			};
		$V.public('Ctrl',Ctrl);
	});