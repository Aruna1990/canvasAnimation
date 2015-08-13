window.onload = function(){
	var canvas = document.getElementById("stage");
	canvas.width = canvas.parentNode.clientWidth;;
	canvas.height = 500;
	var playButton = document.getElementById("play");
	var stopButton = document.getElementById("stop");
	var parm = {
		stage: canvas,
		img: "store.png",
		plist: "",
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
	playButton.addEventListener("click", function(){
		playButton.style.display = "none";
		stopButton.style.display = "block";
		animation.play(true);
	});
	stopButton.addEventListener("click", function(){
		stopButton.style.display = "none";
		playButton.style.display = "block";
		animation.stop();
	});
};
