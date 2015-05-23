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

	this.drawPad = function(){
		x += vector.getComponents().x;
		y += vector.getComponents().y;
		return {context : canvas, x : x - radius, y : y - radius, dimentions : dims, radius : radius};
	}

	this.applyForce = function(newVector, timer){
		/* apply the force for the given time */
		var atimer = (timer)? timer : 100;
		vector = newVector;
		setTimeout(function() {
			vector = new Vector(0, 0)
		}, atimer);
	}

	return this;
}
