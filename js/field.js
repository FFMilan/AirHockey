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