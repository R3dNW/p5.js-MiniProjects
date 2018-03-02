function PhysEngine(edgeBounce) {
	this.objects = new Set();
	this.edgeBounce = edgeBounce;
	this._lastUpdateTime = Date.now() / 1000.0;
}

PhysEngine.prototype.AddObj = function(physObj) {
	this.objects.add(physObj);
};

PhysEngine.prototype.Update = function() {
	var currentTime = Date.now() / 1000.0;
	var dt = currentTime - this._lastUpdateTime;
	this._lastUpdateTime = currentTime;

	for (obj of this.objects) {
		 obj.Update(dt);

		 if (this.edgeBounce){
		 	if (obj.pos.x < -width / 2 || obj.pos.x > width / 2) {
		 		obj.pos.x = constrain(obj.pos.x, -width / 2, width / 2);
		 		obj.vel.x = -obj.vel.x;
		 	}

		 	if (obj.pos.y < -height / 2 || obj.pos.y > height / 2) {
		 		obj.pos.y = constrain(obj.pos.y, -height / 2, height / 2);
		 		obj.vel.y = -obj.vel.y;
		 	}
		}
	}
};

PhysEngine.prototype.MergeObj = function(a, b) {
    this.objects.delete(b);

    a.pos = createVector(
    	(a.pos.x * a.mass + b.pos.x * b.mass) / (a.mass + b.mass),
    	(a.pos.y * a.mass + b.pos.y * b.mass) / (a.mass + b.mass)
	)

    var momentum = p5.Vector.add(a.Momentum(), b.Momentum());    
    a.SetMass(a.mass + b.mass);
    a.vel = momentum.div(a.mass);

    return a;
}