window.onload = function() {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var ratio = window.innerHeight / 7;
	canvas.height = window.innerHeight;
	canvas.width = ratio * 15;

	var world = Physics();
	var renderer = Physics.renderer(canvas, {
		meta: false,
		styles: {
			'circle' : {
				strokeStyle: 'hsla(60, 37%, 17%, 1)',
				lineWidth: 1,
				fillStyle: 'hsla(60, 37%, 57%, 0.8)',
				angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
			}
		}
	});
	world.add(renderer);
	world.on('step', function(){
		world.render();
	});
	var pad = Physics.body("circle", {
		x: 50,
		y: 50,
		radius: 20
	});
	world.add(pad);
	/*var field = new Field();
	var pad = new Pad();*/

	Physics.util.ticker.on(function(time, dt){
		world.step(time);
	});
	Physics.util.ticker.start();
}