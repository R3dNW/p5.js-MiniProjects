var stringCircle;

function preload(){

}

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);

	stringCircle = new string(1024, 5.32);
}

function draw(){
	stringCircle.draw();
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  resizeCanvas(w,h);
  width = w;
  height = h;
}