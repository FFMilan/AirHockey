window.onload = function() {
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	canvas.id = "my_canvas";
	var ctx = canvas.getContext("2d");
	var ratio = window.innerHeight / 7;
	document.body.style.height = window.innerHeight;
	document.body.style.width = ratio * 15;

	var world = Physics();
	var renderer = Physics.renderer('canvas', {
		el: "my_canvas",
		meta: false,
		styles: {
			'circle' : {
				strokeStyle: 'hsla(60, 37%, 17%, 1)',
				lineWidth: 1,
				fillStyle: 'hsla(60, 37%, 57%, 0.8)'
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
		radius: ratio/2,
		treatment: "dynamic",
		mass: 1.0,
		restitution: 0.8,
		cof: 0.8
	});
	world.add(pad);

	var bounds = Physics.aabb(0, 0, ratio * 15, window.innerHeight);
	world.add( Physics.behavior('edge-collision-detection', {
		aabb: bounds,
		restitution: 0.3
	}));
	world.add(Physics.behavior('body-impulse-response'));
	world.add(Physics.behavior('interactive', {
		el: "my_canvas"
	}));

	world.on("interact:grab", function(e) {
		if(e.body) {
			console.log(e.body);
		}
	});
	world.on("interact:release", function(e) {
		/*if(e.body)
			e.body.treatment = "dynamic";*/
	});



	Physics.util.ticker.on(function(time, dt){
		world.step(time);
	});
	Physics.util.ticker.start();
}