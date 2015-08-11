var canvas = null;
var img = null;
var ctx = null;
var resize = function(){
	canvas.width = canvas.parentNode.clientWidth;;
	canvas.height = canvas.parentNode.clientHeight;
	img = new Image();
	img.src = "store.png";
	img.onload = function(){
		console.log(img.width);
		console.log(img.height);
		ctx.drawImage(/*规定要使用的图像、画布或视频。*/img,
					/*可选。开始剪切的 x 坐标位置。*/ 150,
					/*可选。开始剪切的 y 坐标位置。*/0,
					/*可选。被剪切图像的宽度。*/100,
					/*可选。被剪切图像的高度。*/100,
					/*在画布上放置图像的 x 坐标位置。*/(canvas.width-img.width)/2,
					/*在画布上放置图像的 y 坐标位置。*/(canvas.height-img.height)/2,
					/*可选。要使用的图像的宽度。（伸展或缩小图像）*/100,
					/*可选。要使用的图像的高度。（伸展或缩小图像）*/100);//canvas.width/2 – (img.width/2), canvas.height/2 – (img.height/2)
	};
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#333333";
	ctx.fillRect(canvas.width/3, canvas.height/3, canvas.width/3, canvas.height/3);
	console.log(ctx);

	// ctx.drawImage(img, canvas.width/2,canvas.height/2);//canvas.width/2 – (img.width/2), canvas.height/2 – (img.height/2)
};
window.onload = function(){
	canvas = document.getElementById("stage");
	resize();
};