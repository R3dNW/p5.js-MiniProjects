function Ball(radius){
	this.pos = createVector(random(0, width), random(0, height));

	this.vel = p5.Vector.random2D();
	this.vel.mult(200);

	this.r = radius;
}

Ball.prototype.update = function(deltaTime) {
	this.pos.x += this.vel.x * deltaTime;
	this.pos.y += this.vel.y * deltaTime;

	if (this.pos.x < 0){
		this.pos.x = 0;
		this.vel.x = -this.vel.x;
	} else if (this.pos.x > width){
		this.pos.x = width
		this.vel.x = -this.vel.x;
	}

	if (this.pos.y < 0){
		this.pos.y = 0;
		this.vel.y = -this.vel.y;
	} else if (this.pos.y > height){
		this.pos.y = height
		this.vel.y = -this.vel.y;
	}
};

Ball.prototype.draw = function() {
	noFill();
	stroke(255);

	ellipse(this.pos.x, this.pos.y, this.r, this.r);
};