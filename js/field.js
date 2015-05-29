function Field() {
	var x = window.innerWidth;
	var y = window.innerHeight;
	var elements = [];

	this.getWidth = function() {
		return x;
	}

	this.getHeight = function() {
		return y;
	}

	this.getElements = function() {
		return elements;
	}

	this.addElement = function(elem) {
		elements.push(elem);
	}

	/* Check elem-bounds collisions 
	 *
	 * Idea: an element collide with bounds only in
	 * 4 positions (N,S,E,W). So we're checking
	 * the element doesn't collide with field bounds
	 * in this pisitions.
	 */
	this.collidesBounds = function(elem) {
		var radius = elem.getPosition().radius;
		var posX = elem.getPosition().x;
		var posY = elem.getPosition().y;
		var bounds = [0,y,0,x];
		//if((posX > 0+radius && posX < x-radius) && (posY > 0+radius && posY < y-radius))
		for (bound of bounds) {
			var distance = posX + posY + bound;
			if(distance <= radius) {
				return true;
			}
		}
		return false;
		/*else
			return true;*/
	}

	/* Check 2-elems collision using distance between elems */
	this.collidesWith = function(elem1, elem2) {
		var radius1 = elem1.getPosition().radius;
		var radius2 = elem2.getPosition().radius;
		var posX1 = elem1.getPosition().x;
		var posY1 = elem1.getPosition().y;
		var posX2 = elem2.getPosition().x;
		var posY2 = elem2.getPosition().x;
		var distance = Math.sqrt(Math.pow(posX1 + posX2, 2) + Math.pow(posY1 + posY2, 2));
		if (distance - (radius1 + radius2) <= 0)
			return true;
		else
			return false;
	}

	return this;
}