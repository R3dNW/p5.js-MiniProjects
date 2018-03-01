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

	for (var i = 0; i < this.objects.length; i++) {
		 this.objects[i].Update(dt);

		 if (this.edgeBounce){
		 	if (this.objects[i].pos.x < -width / 2 || this.objects[i].pos.x > width / 2) {
		 		this.objects[i].pos.x = constrain(this.objects[i].pos.x, -width / 2, width / 2);
		 		this.objects[i].vel.x = -this.objects[i].vel.x;
		 	}

		 	if (this.objects[i].pos.y < -height / 2 || this.objects[i].pos.y > height / 2) {
		 		this.objects[i].pos.y = constrain(this.objects[i].pos.y, -height / 2, height / 2);
		 		this.objects[i].vel.y = -this.objects[i].vel.y;
		 	}
		}
	}
};

PhysEngine.prototype.MergeObj = function(a, b) {
    this.objects.delete(b);

    var momentum = p5.Vector.add(a.Momentum(), b.Momentum());

    a.mass += b.mass;
    a.vel = momentum.div(a.mass);

    return a;
}