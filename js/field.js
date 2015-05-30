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

	/*this.collidesBounds = function(elem) {
		var el = elem;
		if(collidesLeftRight(el))
			return 1;
		else if(collidesUpDown(el))
			return 2;
		else
			return 0;
	}*/

	/* Collision with y=0 and y=innerWidth */
	/*function collidesLeftRight(elem) {
		var radius = elem.getPosition().radius;
		var posX = elem.getPosition().x;
		if(posX <= radius || posX + radius >= x) {
			return true;
		}
		return false;
	}*/

	/* Collision with x=0 and x=innerHeight */
	/*function collidesUpDown(elem) {
		var radius = elem.getPosition().radius;
		var posY = elem.getPosition().y;
		if(posY <= radius || posY + radius >= y) {
			return true;
		}
		return false;
	}*/

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