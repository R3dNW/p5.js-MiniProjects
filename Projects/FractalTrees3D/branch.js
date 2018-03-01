function Branch(length, aX){
	this.length = length;
	this.aY = random(-TWO_PI, TWO_PI);
	this.aX = aX;
	this.children = null;
	this.rt = 0;

	if (this.length >= minLength){
		this.children = [];

		var n = map(this.length, minLength, startLength, minSubBranches, maxSubBranches);

		var numBranches = constrain(round(random(n - branchVariance, n + branchVariance)), 2, 10);
		
		if (numBranches > 0){
			var anglePerBranch = (maxAngle - minAngle) / (numBranches - 1);

			for (var i = 0; i < numBranches; i++) {
				this.children.push(new Branch(this.length * (2 / 3) * random(0.9, 1.1), minAngle + anglePerBranch * i * random(0.8, 1.2)))
			}
		}
	}
}

Branch.prototype.draw = function() {
	push();

	rotateY(this.aY + this.rt);
	rotateZ(this.aX);
	stroke(map(this.length, minLength, startLength, 0, 255), 255, 255);
	//stroke(255)
	strokeWeight(this.length / 20);
	
	beginShape(LINES);
	vertex(0, 0, 0);
	vertex(0, -this.length, 0);
	endShape();

	translate(0, -this.length, 0)

	if (this.children != null){
		for (child of this.children){
			child.draw();
		}
	}

	this.rt += 0.02

	pop();
};