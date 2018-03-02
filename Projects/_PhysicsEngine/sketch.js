var engine;

var numObjects = 400;

var centreObj;

function preload() {

}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	colorMode(HSB);

	engine = new PhysEngine(true);
	centreObj = new PhysObj(createVector(0, 0), 1000, 0);
	engine.AddObj(centreObj);

	for (var i = 0; i < numObjects - 1; i++) {
		var obj = new PhysObj(
			createVector(random(-width / 2, width / 2), random(-height / 2, height / 2)),
			random(5, 25),
			0);

		/*obj.vel = p5.Vector.random2D();
		obj.vel.mult(random(100, 400));*/

		ang = Math.atan2(obj.pos.y, obj.pos.x);

		if (ang < 0){
			ang = TWO_PI + ang;
		}

		ang +=  HALF_PI;

		obj.vel = p5.Vector.fromAngle(ang);
		obj.vel.mult(random(200, 800) * obj.pos.mag() / max(width, height));

		engine.AddObj(obj);
	}
}

function draw() {
	background(0);
	translate(width / 2, height / 2);
	
	var toMerge = []

	for (a of engine.objects) {
		for (b of engine.objects) { 
			if (a === b){
				continue;
			}

			var aToB = p5.Vector.sub(b.pos, a.pos);
			var dist = aToB.mag();
			
			if (dist < (b.sqrtMass + a.sqrtMass)) {
				toMerge.push([a, b]);
				continue;
			}

			var direction = aToB.copy().normalize();
			a.AddForce(p5.Vector.mult(direction, 80 * a.mass * b.mass / (dist*dist)));
		}
	}

	for (tm of toMerge){
		if (engine.objects.has(tm[0]) && engine.objects.has(tm[1])) {
			engine.MergeObj(tm[0], tm[1]);
		}
	}

	engine.Update();

	//centreObj.pos.mult(0);

	ellipseMode(RADIUS)

	for (obj of engine.objects) {
		noStroke();
		fill(300-obj.sqrtMass*3, obj.sqrtMass*10, 255, 128);
		ellipse(obj.pos.x, obj.pos.y, obj.sqrtMass, obj.sqrtMass);
	}
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  resizeCanvas(w,h);
  width = w;
  height = h;
}