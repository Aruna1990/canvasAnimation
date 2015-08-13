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
	console.log(this);
	this.init = function(parm){
		// getFrames();
		self.stage = parm.stage;
		var ctx = self.stage.getContext("2d");
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, self.stage.width, self.stage.height);
		ctx.fillStyle = "#333333";
		ctx.fillRect(self.stage.width/3, self.stage.height/3, self.stage.width/3, self.stage.height/3);
		self.node = {};
		self.img = new Image();
		self.img.src = self.source.png;
		self.frames = getFrames(self.source.plist);
		self.img.onload = function(){
			ctx.drawImage(/*规定要使用的图像、画布或视频。*/self.img,
						/*可选。开始剪切的 x 坐标位置。*/ parm.cutX,
						/*可选。开始剪切的 y 坐标位置。*/parm.cutY,
						/*可选。被剪切图像的宽度。*/parm.width,
						/*可选。被剪切图像的高度。*/parm.height,
						/*在画布上放置图像的 x 坐标位置。*/parm.x,
						/*在画布上放置图像的 y 坐标位置。*/parm.y,
						/*可选。要使用的图像的宽度。（伸展或缩小图像）*/parm.imgWidth,
						/*可选。要使用的图像的高度。（伸展或缩小图像）*/parm.imgHeight);
		};
		console.log(self);
	};
	this.play = function(repeat){
		self.isStart = true;
		var drawImage = function(i){
			var imgIndex = i%10;
			var ctx = self.stage.getContext("2d");
			ctx.clearRect(0,0,self.stage.width,self.stage.height);

			ctx.drawImage(/*规定要使用的图像、画布或视频。*/self.img,
						/*可选。开始剪切的 x 坐标位置。*/ self.cutX,
						/*可选。开始剪切的 y 坐标位置。*/self.cutY+imgIndex*105,
						/*可选。被剪切图像的宽度。*/self.width,
						/*可选。被剪切图像的高度。*/self.height,
						/*在画布上放置图像的 x 坐标位置。*/self.x,
						/*在画布上放置图像的 y 坐标位置。*/self.y,
						/*可选。要使用的图像的宽度。（伸展或缩小图像）*/self.imgWidth,
						/*可选。要使用的图像的高度。（伸展或缩小图像）*/self.imgHeight);
		};
		var count = 0;
		if(repeat){
			self.timer = setInterval(function(){
				if(!self.isStart){
					clearInterval(self.timer);
					return;
				}
				drawImage(count ++);
			},100)
		}
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
	var getFrames = function(source){
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
		       return frames;
		   }
		}); 
	};
	this.init(parm);
};