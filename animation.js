var Animation = function(parm){
	if (!parm || !parm.stage) {
		console.error("Animation 初始化参数无效！");
		return;
	}
	var self = this;
	this.stage = parm.stage;
	this.source = {
		png: parm.img,
		plist: parm.plist
	};
	this.cutX = parm.cutX;
	this.cutY = parm.cutY;
	this.width = parm.width;
	this.height = parm.height;
	this.x = parm.x;
	this.y = parm.y;
	this.imgWidth = parm.imgWidth;
	this.imgHeight = parm.imgHeight;
	this.isStart = false;
	this.currentX = 0;
	this.currentY = 0;
	console.log(this);
	this.init = function(parm){
		// getFrames();
		self.stage = parm.stage;
		self.ctx = self.stage.getContext("2d");
		self.ctx.fillStyle = "#000000";
		self.ctx.fillRect(0, 0, self.stage.width, self.stage.height);
		// ctx.fillStyle = "#333333";
		// ctx.fillRect(self.stage.width/3, self.stage.height/3, self.stage.width/3, self.stage.height/3);
		self.node = {};
		self.bg = new Image();
		self.bg.src = "bg.jpg";
		self.bg.onload = function(){
			self.ctx.drawImage(self.bg, 0, 0)
		};
		self.img = new Image();
		self.img.src = self.source.png;
		getFrames(self.source.plist, function(frames){
			self.frames = frames;
			console.log("frames");
			console.log(self.frames);
			self.img.onload = function(){
				self.ctx.drawImage(/*规定要使用的图像、画布或视频。*/self.img,
							/*可选。开始剪切的 x 坐标位置。*/ self.frames[0].position.startX,
							/*可选。开始剪切的 y 坐标位置。*/self.frames[0].position.startY,
							/*可选。被剪切图像的宽度。*/self.frames[0].sourceSize.width,
							/*可选。被剪切图像的高度。*/self.frames[0].sourceSize.height,
							/*在画布上放置图像的 x 坐标位置。*/parm.x,
							/*在画布上放置图像的 y 坐标位置。*/parm.y,
							/*可选。要使用的图像的宽度。（伸展或缩小图像）*/self.frames[0].sourceSize.width,
							/*可选。要使用的图像的高度。（伸展或缩小图像）*/self.frames[0].sourceSize.height);
			};
			console.log(self);
		});
	};
	this.drawing = function(status){
		var drawImage = function(i){
			var imgIndex = i%10;
			// var ctx = self.stage.getContext("2d");
			self.ctx.fillStyle = "#000000";
			self.ctx.clearRect(0,0,self.stage.width,self.stage.height);
			self.ctx.drawImage(self.bg, 0, 0)
			self.ctx.drawImage(/*规定要使用的图像、画布或视频。*/self.img,
						/*可选。开始剪切的 x 坐标位置。*/ self.frames[imgIndex].position.startX,
						/*可选。开始剪切的 y 坐标位置。*/self.frames[imgIndex].position.startY,
						/*可选。被剪切图像的宽度。*/self.frames[imgIndex].sourceSize.width,
						/*可选。被剪切图像的高度。*/self.frames[imgIndex].sourceSize.height,
						/*在画布上放置图像的 x 坐标位置。*/self.x,
						/*在画布上放置图像的 y 坐标位置。*/self.y,
						/*可选。要使用的图像的宽度。（伸展或缩小图像）*/self.frames[imgIndex].sourceSize.width,
						/*可选。要使用的图像的高度。（伸展或缩小图像）*/self.frames[imgIndex].sourceSize.height);
		};
		var count = 0;
		if(status == "attack"){
			self.timer = setInterval(function(){
				if(!self.isStart || count> self.frames.length){
					self.isStart  = false;
					clearInterval(self.timer);
					return;
				}
				drawImage(count ++);
			},100)
		}
		else if(status == "move"){
			self.ctx.fillStyle = "#000000";
			self.ctx.clearRect(0,0,self.stage.width,self.stage.height);
			self.ctx.drawImage(self.bg, 0, 0)
			self.ctx.drawImage(/*规定要使用的图像、画布或视频。*/self.img,
						/*可选。开始剪切的 x 坐标位置。*/ self.frames[0].position.startX,
						/*可选。开始剪切的 y 坐标位置。*/self.frames[0].position.startY,
						/*可选。被剪切图像的宽度。*/self.frames[0].sourceSize.width,
						/*可选。被剪切图像的高度。*/self.frames[0].sourceSize.height,
						/*在画布上放置图像的 x 坐标位置。*/self.x,
						/*在画布上放置图像的 y 坐标位置。*/self.y,
						/*可选。要使用的图像的宽度。（伸展或缩小图像）*/self.frames[0].sourceSize.width,
						/*可选。要使用的图像的高度。（伸展或缩小图像）*/self.frames[0].sourceSize.height);
		}
	};
	this.attack = function(repeat){
		self.isStart = true;
		self.drawing("attack");
	};
	this.move = function(position){
		if(self.isStart) return;
		self.x = position.x-self.frames[0].sourceSize.width/2;
		self.y = position.y-self.frames[0].sourceSize.height/2;
		self.drawing("move");
	};
	this.stop = function(){
		self.isStart = false;
	};
	var getNumbers = function(str){
       var array = str.split(',');
       for(var i=0; i<array.length; i++){
       	    array[i] = array[i].replace(/[^0-9]/ig,"");
       }
       return array;
	};

	var getFrames = function(source, callback){
		var frames = [];
		$.ajax({
		   type: "GET",//请求方式
		   url: source,//地址，就是action请求路径
		   data: "xml",//数据类型text xml json  script  jsonp
		   success: function(data){//返回的参数就是 action里面所有的有get和set方法的参数
		       var frameData = $.xml2json(data).dict.dict[0];
		       console.log(frameData);
		       for(var i =0; i<frameData.key.length; i++){
		           var frame = {};
		           frame.number = parseInt(frameData.key[i].split('.')[0]);
		           var temp = getNumbers(frameData.dict[i].string[0]);
		           frame.position = {
		           	   startX:temp[0],
		           	   startY:temp[1],
		           	   endX:temp[2],
		           	   endY:temp[3]
		           };
		           temp = getNumbers(frameData.dict[i].string[1]);
		           frame.offset = {
		           	   x:temp[0],
		           	   y:temp[1]
		           };
		           frame.rotated = frameData.dict[i].false==undefined ? true : false;
		           temp = getNumbers(frameData.dict[i].string[2]);
		           frame.sourceColorRec = {
		           	   startX:temp[0],
		           	   startY:temp[1],
		           	   endX:temp[2],
		           	   endY:temp[3]
		           };
		           temp = getNumbers(frameData.dict[i].string[3]);
		           frame.sourceSize = {
		           	   width: temp[0],
		           	   height: temp[1]
		           };
		           frames.push(frame);
		       }
		       frames.sort(function(a,b){return a.number>b.number?1:-1});
		       console.log(frames);
		       callback(frames);
		   }
		}); 
	};
	this.init(parm);
};