var branch;

var startLength = 200;
var minLength = 40;

var minSubBranches = 2;
var maxSubBranches = 6;
var branchVariance = 1;

var minAngle;
var maxAngle; 


var rt = 0;


function preload(){
	minAngle = -PI * (1 / 3);
	maxAngle = PI * (1 / 3);
}

function setup(){
	createCanvas(1280, 720, WEBGL);
	branch = new Branch(startLength, 0);
	colorMode(HSB)
}

function draw(){
	//console.log(rt)
	background(0);
	rotateY(rt);
	translate(0, height/2, 0);
	branch.draw();

	rt -= 0.02;
}