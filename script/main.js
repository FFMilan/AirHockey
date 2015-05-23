window.onload = function() {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var ratio = window.innerHeight / 7;
	canvas.height = window.innerHeight;
	canvas.width = ratio * 15;

	var field = new Field();
	var pad = new Pad();
	
}