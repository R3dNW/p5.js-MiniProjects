function PhysObj(pos, mass, drag) {
	this.pos = pos;
	this.vel = createVector(0, 0);
	this.force = createVector(0, 0);
	
	this.mass = mass;

	this.sqrtMass = sqrt(mass);

	this.drag = drag;
}

PhysObj.prototype.Update = function(dt) {
	this.force.div(this.mass);
	this.vel.add(this.force);
	this.force.mult(0);

	this.pos.add(p5.Vector.mult(this.vel, dt));

	if (drag != 0){
		var v2 = this.vel.magSq();
		var drag = this.vel.copy();
		drag.normalize();
		drag.mult(v2 * this.drag);
		this.force.add(drag);
	}
};

PhysObj.prototype.AddForce = function(force) {
	this.force.add(force);
}

PhysObj.prototype.Momentum = function() {
	return this.vel.copy().mult(this.mass);
}