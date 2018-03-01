function Branch(length, angle){
	this.length = length;
	this.angle = angle;
	this.children = null;

	if (this.length >= minLength){
		this.children = [];

		var numBranches = floor(random(minSubBranches, maxSubBranches));
		var anglePerBranch = (maxAngle - minAngle) / (numBranches - 1);

		for (var i = numBranches - 1; i >= 0; i--) {
			this.children.push(new Branch(this.length * (2 / 3) * random(0.9, 1.1), minAngle + anglePerBranch * i * random(0.8, 1.2)))
		}
	}
}

Branch.prototype.draw = function() {
	push();

	rotate(this.angle);
	stroke(map(this.length, minLength, startLength, 0, 255), 255, 255);
	strokeWeight(this.length / 20)
	line(0, 0, 0, -this.length);

	translate(0, -this.length)

	if (this.children != null){
		for (child of this.children){
			child.draw();
		}
	}

	pop();
};