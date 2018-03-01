var globalInt = 10;
var globalString = "1020";
var globalArray = [globalInt, globalString];



function preload(){

}

function setup(){
	// Creates a HTML canvas of size 400x400 pixels
	createCanvas(400, 400);

	// The coordinate system starts at the top-left corner and goes to the bottom-right
	// (0,0) ______ .
	// |			|
	// |			|
	// |			|
	// |			|
	// |			|
	// . ______(400, 400)
}

function draw(){
	// Fills the screen with black
	background(0);

	// Sets p5 to draw white lines
	stroke(255);

	// Sets p5 to draw lines that are 4pixels thick
	strokeWeight(2);

	// Draw a point at (10, 10)
	point(10, 10);

	// Draw a line between (20, 20) and (40,  20)
	line(20, 20, 40, 20);

	// Draw a circle centre (60, 60) diameter 40
	ellipse(60, 60, 40, 40);

	// Draw a box where the top left corner is (20, 100), width 40, height 80
	rect(20, 100, 40, 80);

	// Create a new Instance of MyClass
	myInstance = new MyClass();
}

// You can create classes with constructor functions
function MyClass(){
	this.myInt = 10;
	this.myString = "Hello World!";
	this.myFloat = 20.0;
}

// You can add functions to these classes like so:
MyClass.prototype.MyFunction = function(arg1, arg2) {
	return arg1 + arg2;
};