function RadialVisualiser(radiusFunction = (angle) => 1, offsetX=0, offsetY=0) {
	this.radiusFunction = radiusFunction;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.offsetAngle = Math.atan2(this.offsetY, this.offsetX);
	this.offsetMagnitude = sqrt(this.offsetX * this.offsetX + this.offsetY * this.offsetY);
	
	this.resolution = 1024;
	this.rotations = 1;

	this.rotationRate = 0;

	this.distortion = 0;
	this.distortionMode = RadialVisualiser.MULT;

	this.fixedColor = false;
	this._color_mid = null;
	this._color_ends = null;
	this.fadeEnds = true;
	this.bg_color = color(0);

	this.scale = 1;
	this.radius;

	this.timeScale = 0.05 * (0.001);

	this.time = Date.now() * this.timeScale;
}

RadialVisualiser.MULT = 0;
RadialVisualiser.ADD = 1;

RadialVisualiser.prototype.setColors = function (color_mid = null, color_ends = null) {
	if (color_mid) {
		this.fixedColor = true;
		this._color_mid = color_mid;
		if (color_ends) {
			this._color_ends = color_ends;
		}
		else {
			this._color_ends = color_mid;
		}
	}
	else {
		this.fixedColor = false;
	}
}

RadialVisualiser.prototype.getCoord = function (i) {
	var angle = i / this.resolution * this.rotations * TWO_PI;
	var r = this.radiusFunction(angle);

	if (this.distortion != 0) {
		if (this.distortionMode == RadialVisualiser.MULT) {
			r *= 1 - this.distortion + 2 * this.distortion * noise(angle * 0.5, this.time * 1.5);
		}
		else if (this.distortionMode == RadialVisualiser.ADD) {
			r = r + this.distortion * (-0.5 + noise(angle * 0.5, this.time * 1.5));
		}
	}

	var x =  this.radius * (r * cos(angle + this.time * this.rotationRate) + this.offsetMagnitude * cos(this.offsetAngle + this.time * this.rotationRate));
	var y = -this.radius * (r * sin(angle + this.time * this.rotationRate) + this.offsetMagnitude * sin(this.offsetAngle + this.time * this.rotationRate)); // The coordinate system used in p5 is inverted in y

	return [x, y];
}

RadialVisualiser.prototype.getAlpha = function (i, degree = 1, scale = 1) {
	p = 2 * round(degree);
	return -((pow(2, p) * scale) / pow(this.resolution, p)) * pow(i - this.resolution / 2, p) + scale;
}

RadialVisualiser.prototype.draw = function (posX = null, posY = null) {
	push();

	this.time = Date.now() * this.timeScale;

	if (posX && posY) {
		translate(posX, posY);
	}
	else if (posX) {
		translate(posX, 0);
	}
	else if (posY) {
		translate(0, posY);
	}
	else {
		//translate(0, 0);
	}

	if (!this.fixedColor) {
		colorMode(HSB);
		this._color_mid = color((this.time * 60 + 60) % 360, 255, 255);
		this._color_ends = color((this.time * 60) % 360, 255, 255);
		colorMode(RGB);
	}

	this.radius = (1.0 / 3) * min(width, height) * this.scale;

	var prev_l = this.getCoord(0);
	var prev_r = this.getCoord(this.resolution - 1);

	for (var i = 0; i < this.resolution / 2 + 1; i++) {
		var alpha = this.getAlpha(i);

		c = lerpColor(this._color_ends, this._color_mid, alpha);
		if (this.fadeEnds) {
			c = lerpColor(this.bg_color, c, alpha);
		}
		stroke(c);

		coord = this.getCoord(i);
		line(prev_l[0], prev_l[1], coord[0], coord[1]);
		prev_l = coord;

		coord = this.getCoord(this.resolution - i);
		line(prev_r[0], prev_r[1], coord[0], coord[1]);
		prev_r = coord;
	}

	pop();
}