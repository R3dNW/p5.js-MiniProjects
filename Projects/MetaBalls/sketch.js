var balls;

var num_balls = 5;
var ball_radius = 50;

var prevTime;

function preload(){

}

function setup(){
	createCanvas(400, 200);

	getDeltaTime();

	balls = [];

	for (var i = 0; i < num_balls; i++) {
		balls.push(new Ball(ball_radius));
	}
}

function draw(){
	dt = getDeltaTime();
	console.log(dt);

	background(0)

	loadPixels();
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			s = 0;

			for (ball of balls){
				s += ball.r / ((ball.pos.x - x) * (ball.pos.x - x) + (ball.pos.y - y) * (ball.pos.y - y));
			}

			s *= 1000;

			set(x, y, color(s));
		}	
	}
	updatePixels();
}

// Gets the number of seconds passed since the function was last called
function getDeltaTime(){
	var newTime = Date.now() / 1000;
	var deltaTime = newTime - prevTime;
	prevTime = newTime;
	return deltaTime;
}