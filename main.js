window.onload = function(){
	var canvas = document.getElementById("stage");
	canvas.width = canvas.parentNode.clientWidth;
	canvas.height = canvas.parentNode.clientHeight;
	// console.log(loadXML());
	var playButton = document.getElementById("play");
	var stopButton = document.getElementById("stop");
	var parm = {
		stage: canvas,
		img: "test3.png",
		plist: "test3.plist",
		cutX: 140,
		cutY: 0,
		width: 110,
		height: 105,
		x: 0,
		y: 0,
		imgWidth: 100,
		imgHeight: 100
	};
	var animation = new Animation(parm);
	// playButton.addEventListener("click", function(){
	// 	playButton.style.display = "none";
	// 	stopButton.style.display = "block";
	// 	animation.play(true);
	// });
	// stopButton.addEventListener("click", function(){
	// 	stopButton.style.display = "none";
	// 	playButton.style.display = "block";
	// 	animation.stop();
	// });
	canvas.addEventListener("click", function(){
		animation.attack();
	});

	canvas.addEventListener("mousemove", function(event){
		var x,y;
	    if(event.pageX || event.pageY){
	      x=event.pageX;
	      y=event.pageY;
	    }else{
	      x=event.clientX+document.body.scrollLeft+
	      document.documentElement.scrollLeft;
	      y=event.clientY+document.body.scrollTop+
	      document.documentElement.scrollTop;
	    }
	    x -= canvas.offsetLeft;
	    y -= canvas.offsetTop;
	     
		animation.move({x:x,y:y});
	})
};
