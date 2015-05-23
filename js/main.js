var pad = new Pad();

window.onload = function() {
  console.log("here");
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	var ctx = canvas.getContext("2d");
	var ratio = window.innerHeight / 7;
	canvas.height = window.innerHeight;
	canvas.width = ratio * 15;

	var field = new Field();
	
	var padCanvas = pad.drawPad();
	ctx.drawImage(padCanvas.context, padCanvas.x, padCanvas.y);
	
	var lastPress = null;
	var direction = null;
	canvas.addEventListener("mousedown",function(e){
    //check if the pad is pressed
    console.log({x : e.clientX, y: e.clientY});
    if(isOver({x : e.clientX, y: e.clientY},
      {x : pad.getPosition().x ,
       x2 : pad.getPosition().x + pad.getPosition().dims,
       y : pad.getPosition().y,
       y2 : pad.getPosition().y + pad.getPosition().dims}
     ))
      lastPress = {x : pad.getCenterPosition().x, y: pad.getCenterPosition().y};
    else{
      lastPress = null;
      direction = null;
    }
  });
  
  canvas.addEventListener("mouseup",function(e){
    console.log({x : e.clientX, y: e.clientY});
    if(lastPress){
      direction = (e.clientX > lastPress.x)? true : false;
      var distance = Math.sqrt(Math.pow(e.clientX - lastPress.x, 2) + Math.pow(e.clientY - lastPress.y, 2), 2);
      var angle = Math.atan((e.clientX - lastPress.x) / (e.clientY - lastPress.y));
      console.log(distance,angle,(direction)? "avanti" : "indietro");
      ctx.clearRect(pad.getPosition().x, pad.getPosition().y, pad.getPosition().dims, pad.getPosition().dims);
      pad.applyForce(new Vector(angle,distance));
      var padCanvas = pad.drawPad();
      ctx.drawImage(padCanvas.context, padCanvas.x, padCanvas.y);
    }
  });
}

function isOver(point,elem){
  return (point.x > elem.x && point.x < elem.x2) && (point.y > elem.y && point.y < elem.y2)
}
