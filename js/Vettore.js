function Vector(ang, inte, dir) {
	/* private attributes */
	//console.log(dir);
	var direct = (dir !== undefined)? dir : true;
	var ang = (ang) ? ang : 0;
	var intensity = (inte) ? inte : 50;
	var friction = 1;
	
	/* private functions */

	function getAngle(a, b) {
		return Math.atan((a[1] + b[1]) / (a[0] + b[0]));
	}

	function getDistance(a, b) {
		return Math.sqrt(Math.round(a[0] - b[0], 2) + Math.round(a[0] - b[0], 2));
	}

	/* public methods */
	this.getAngle = function() {
		return ang;
	}

	this.getIntensity = function() {
		return intensity;
	}

	this.setAngle = function (num) {
		ang = num;
	}

	this.setDirection = function(direction) {
		dir = direction;
	}

	this.setIntensity = function (num) {
		intensity = num;
	}

	this.setFriction = function(num) {
		friction = num;
	}

	this.get = function() {
		return {angle : ang, intensity : intensity, friction : friction};
	}

	this.set = function(Vector) {
		ang = Vector.angle;
		intensity = Vector.intensity;
	}

	this.getComponents = function(){
		//console.log(direct);
		if(direct)
			return {x : (Math.cos(ang) * intensity), y : (Math.sin(ang) * intensity)};
		else
			return {x : -(Math.cos(ang) * intensity), y : -(Math.sin(ang) * intensity)};
	};

	this.add = function(v) {
		var vc = v.getComponents();
		var sc = this.getComponents();
		ang = getAngle(sc,vc);
		intensity = Math.sqrt(Math.round(sc[0], 2) + Math.round(sc[1], 2)); //
	};

	this.symmetricalTo = function(ang_asse) {
		ang = ang_asse - ang + ang_asse;
	};

	this.applyFriction = function() {
		intensity = intensity / friction;
	}

	return this;
};


