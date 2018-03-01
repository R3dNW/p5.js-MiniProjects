var engine;

var numObjects = 10;

var centreObj;

function preload() {

}

function setup() {
	createCanvas(600, 600);

	this.engine = new PhysEngine(true);
	centreObj = new PhysObj(createVector(0, 0), 10000, 0);
	this.engine.AddObj(centreObj);

	for (var i = 0; i < numObjects - 1; i++) {
		var obj = new PhysObj(
			createVector(random(-width / 2, width / 2), random(-height / 2, height / 2)),
			random(50, 500),
			0);

		obj.vel = p5.Vector.random2D();
		obj.vel.mult(random(50, 200))

		this.engine.AddObj(obj);
	}
}

function draw() {
	background(0);
	translate(width / 2, height / 2);

	console.log(this.engine);
	
	var toMerge = []

	for (a of this.engine.objects) {
		for (b of this.engine.objects) { 
			var aToB = p5.Vector.sub(b.pos, a.pos);
			var sqrDist = aToB.magSq();
			
			if (sqrDist < (b.mass + a.mass)) {
				toMerge.push([a, b]);
			}

			var direction = aToB.copy().normalize();
			a.AddForce(p5.Vector.mult(direction, 5 * a.mass * b.mass / constrain(sqrDist, b.mass, 1000000000000000)));
		}
	}

	for (tm of toMerge){
		if (this.engine.objects.has(tm[0]) && this.engine.objects.has(tm[1])) {
			engine.MergeObj(tm[0], tm[1]);
		}
	}

	this.engine.Update();

	centreObj.pos.mult(0);

	console.log(this.engine);

	for (obj of this.engine.objects) {
		noStroke();
		fill(255, 255, 255, 128);
		ellipse(obj.pos.x, obj.pos.y, obj.sqrtMass, obj.sqrtMass);
	}
}