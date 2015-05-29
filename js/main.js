field = new Field();
var pad = new Pad();


window.onload = function() {
  console.log("here");
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	var ctx = canvas.getContext("2d");
	var ratio = window.innerHeight / 7;
	canvas.height = window.innerHeight;
	canvas.width = ratio * 15;
	
	pad.drawPad(ctx);
	
	var lastPress = null;
	var direction = null;
  var power = 100;

  var incrementer = null;
	canvas.addEventListener("mousedown",function(e){
    //check if the pad is pressed

    if(isOver({x : e.clientX, y: e.clientY},
      {x : pad.getPosition().x ,
       x2 : pad.getPosition().x + pad.getPosition().dims,
       y : pad.getPosition().y,
       y2 : pad.getPosition().y + pad.getPosition().dims}
     )){
      lastPress = {x : pad.getCenterPosition().x, y: pad.getCenterPosition().y};
      incrementer = setInterval(function(){power -= 10},120);
    }else{
      lastPress = null;
      direction = null;
    }
  });

  var distance = 0;
  var angle = 0;
  
  canvas.addEventListener("mouseup",function(e){

    if(lastPress){
      clearInterval(incrementer);
      direction = (e.clientX > lastPress.x)? true : false;
      distance = Math.sqrt(Math.pow(e.clientX - lastPress.x, 2) + Math.pow(e.clientY - lastPress.y, 2), 2);
      angle = Math.atan((e.clientY - lastPress.y) / (e.clientX - lastPress.x));
      power = (power < 0) ? 0 : power;
      pad.animateUntil(angle,distance,direction,ctx,power);
      power = 100;
    }
  });
}

function isOver(point,elem){
  return (point.x > elem.x && point.x < elem.x2) && (point.y > elem.y && point.y < elem.y2)
}
