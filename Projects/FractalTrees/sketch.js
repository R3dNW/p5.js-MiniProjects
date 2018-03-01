var branch;
var startLength = 220;
var minLength = 10;
var minSubBranches = 2;
var maxSubBranches = 5;
var minAngle;
var maxAngle; 


function preload(){
	minAngle = -PI * (1 / 3);
	maxAngle = PI * (1 / 3);
}

function setup(){
	createCanvas(1280, 720);
	branch = new Branch(startLength, 0);
	colorMode(HSB)
}

function draw(){
	background(0);
	translate(width/2, height);
	branch.draw();
}