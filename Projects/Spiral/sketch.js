var resolution = 200;
var rotations = 16;


var rotationPerArc;
var distancePerArc;

var spiralRadius;

var rt = 0;
var drtSlider;


function preload(){

}

function setup(){
	createCanvas(600, 600);

	spiralRadius = sqrt(2 * (width / 2) * (width / 2))

	rotationPerArc = rotations * TWO_PI / resolution;
	distancePerArc = spiralRadius / (resolution * resolution * resolution);

	drtSlider = createSlider(0, PI, 0.1, 0);

	colorMode(HSB);
}

function draw(){
	background(0);
	
	push();
	translate(width / 2, height / 2)

	noFill();
	stroke(255);
	strokeWeight(2);

  	var grad = this.drawingContext.createRadialGradient(0, 0, 0, 0, 0, spiralRadius);
  	grad.addColorStop(0, 	color((360 + rt) % 360, 255, 255));
  	grad.addColorStop(0.25, color((270 + rt) % 360, 255, 255));
  	grad.addColorStop(0.5, 	color((180 + rt) % 360, 255, 255));
  	grad.addColorStop(0.75, color((90  + rt) % 360, 255, 255));
  	grad.addColorStop(1, 	color((0   + rt) % 360, 255, 255));

  	this.drawingContext.strokeStyle = grad;

	beginShape();
	for (var i = 1; i < resolution; i++) {
		x = distancePerArc * i * i * i * cos(rotationPerArc * i + rt);
		y = distancePerArc * i * i * i * sin(rotationPerArc * i + rt);

		curveVertex(x, y);
	}
	endShape();
	pop();

	rt += drtSlider.value();
}