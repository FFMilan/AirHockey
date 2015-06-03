function Pad(){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var dims = window.innerHeight / 7;
	var radius = dims / 2;
	var x = dims * 2;
	var y = dims * 3;
	var collisions = 0;

	canvas.height = dims;
	canvas.width = dims;
	ctx.beginPath();
    	ctx.arc(dims/2, dims/2, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    	ctx.fill();

	var vector = new Vector(0, 0);
	vector.setFriction(1.02);

	this.getCenterPosition = function(){
		return {x : x, y : y, dims : dims, radius : radius};
	};
	
	this.getPosition = function(){
		return {x : x-radius, y : y-radius, dims : dims, radius : radius};
	};

	this.getForceApplied = vector;

	function drawPad(){
		x += vector.getComponents().x;
		y += vector.getComponents().y;
		return {context : canvas, x : x - radius, y : y - radius, dimentions : dims, radius : radius};
	}

	this.animateUntil = function(angle,distance,direction,mainctx, collisions){
		animate(angle,distance,direction,mainctx, collisions);
	}

	function applyForce(angle, direction){
		/* apply the force for the given time */
		//var atimer = 100;
		vector.applyFriction();
		vector.setAngle(angle);
		vector.setDirection(direction);
	}

	var increm = 0;
	var distance = 0;
	function animate(angle,exdistance,direction,mainctx, collisions){
		//console.log("collisions? ",collisions);
		if(collisions == 2) {
			angle = -angle;
			vector.setAngle(angle);
		}
		else if(collisions == 1) {
			angle = -Math.PI - angle;
			vector.setAngle(angle);
		}
		//console.log(vector.get());
		mainctx.clearRect(x-radius-2, y-radius-2, dims+4, dims+4);
		applyForce(angle, direction);

		drawPad();
		mainctx.drawImage(canvas, x-radius, y-radius);
		collisions = collidesBounds();
		//console.log(collisions);
		window.requestAnimationFrame(function(){
			animate(angle,exdistance,direction,mainctx, collisions);
		});
	}

	this.drawPad = function(cont){
		cont.drawImage(canvas,x-radius,y-radius);
	}

	function collidesBounds() {
		if(collidesLeftRight())
			return 1;
		else if(collidesUpDown())
			return 2;
		else
			return 0;
	}

	/* Collision with y=0 and y=innerWidth */
	function collidesLeftRight() {
		if(x <= radius || x + radius >= field.getWidth()) {
			return true;
		}
		return false;
	}

	/* Collision with x=0 and x=innerHeight */
	function collidesUpDown() {
		if(y <= radius || y + radius >= field.getHeight()) {
			return true;
		}
		return false;
	}

	return this;
}
