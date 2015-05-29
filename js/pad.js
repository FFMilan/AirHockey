function Pad(){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var dims = window.innerHeight / 7;
	var radius = dims / 2;
	var x = dims * 2;
	var y = dims * 3;

	canvas.height = dims;
	canvas.width = dims;
	ctx.beginPath();
    	ctx.arc(dims/2, dims/2, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    	ctx.fill();

	var vector = new Vector(0, 0);

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

	this.animateUntil = function(angle,distance,direction,mainctx,power){
		animate(angle,distance,direction,mainctx,power);
	}

	function applyForce(newVector){
		/* apply the force for the given time */
		var atimer = 100;
		vector = newVector;
	}

	var increm = 0;
	var distance = 0;
	function animate(angle,exdistance,direction,mainctx,power){
		console.log("animating",power,distance,exdistance);
		console.log((distance == exdistance || distance == 0) && increm <= distance && x -radius > 0 && x +radius < window.innerWidth && y -radius> 0 && y +radius < window.innerHeight);
		if((distance == exdistance || distance == 0) && increm <= distance && x -radius > 0 && x +radius < window.innerWidth && y -radius > 0 && y +radius < window.innerHeight){
			distance = exdistance;
			mainctx.clearRect(x-radius-2, y-radius-2, dims+4, dims+4);
			applyForce(new Vector(angle,power/5,direction));
			drawPad();
			mainctx.drawImage(canvas, x-radius, y-radius);
			increm +=power/5;
			window.requestAnimationFrame(function(){
				animate(angle,exdistance,direction,mainctx,power);
			});
		}else{
			distance = 0;
			increm = 0;
		}
	}

	this.drawPad = function(cont){
		cont.drawImage(canvas,x-radius,y-radius);
	}

	return this;
}
