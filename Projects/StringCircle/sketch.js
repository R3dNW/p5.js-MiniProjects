var resolution = 1024;
var rotations = 6;
var radius_ratio = 1/5;
var fac = 0;

var col_e = [128, 0, 255];
var col_m = [0, 128, 255];


var radius;

function preload(){

}

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);
}

function getCoord(i){
	var angle = i / resolution * rotations * TWO_PI;
	var distortedRadius = radius + noise((i/(resolution/rotations)) * 4, fac) * radius * 1.5;

	var x = distortedRadius * cos(angle + fac);
	var y = distortedRadius * sin(angle + fac);

	return [x, y]
}

function draw(){
	background(0);
	push();
	
	translate(width/2, height/2);

	noFill();
	stroke(255);
	strokeWeight(5);


    radius = radius_ratio*min(width, height);

	var prev_l = getCoord(0);
	var prev_r = getCoord(0);

	for (var i = 1; i < resolution/2 + 100; i++) {
		var a = -((4*1)/(resolution*resolution))*(i-resolution/2)*(i-resolution/2)+1;
		
		r = map(a, 0, 1, col_e[0], col_m[0])
		g = map(a, 0, 1, col_e[1], col_m[1])
		b = map(a, 0, 1, col_e[2], col_m[2])

		stroke(r*a, g*a, b*a);

		coord = getCoord(i);
		line(prev_l[0], prev_l[1], coord[0], coord[1]);
		prev_l = coord;

		coord = getCoord(resolution - i);
		line(prev_r[0], prev_r[1], coord[0], coord[1]);
		prev_r = coord;
	}

	pop();

	fac += 0.01;
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  resizeCanvas(w,h);
  width = w;
  height = h;
}