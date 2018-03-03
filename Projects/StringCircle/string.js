function string(resolution, rotations, color_mid=null, color_ends=null){
	this.resolution = resolution;
	this.rotations = rotations;

	if (color_mid){
		this.fixedColor = true;
		this.color_mid = color_mid;
		if (this.color_ends){
			this.color_ends = color_ends;
		}
		else{
			this.color_ends = color_mid;
		}
	}
	else{
		this.fixedColor = false;
	}

	this.radius_screenSize_ratio = 1/5;
	this.radius;
	this.timeScale = 0.05 * (0.001);
}


string.prototype.distortRadius = function(radius, angle, t){
	return this.radius + noise(angle * 0.5, t*1.5) * this.radius * 1.5; 
}

string.prototype.getCoord = function(i, t){
	var angle = i / this.resolution * this.rotations * TWO_PI;
	var r = this.distortRadius(this.radius, angle, t);

	var x = r * cos(angle + t);
	var y = r * sin(angle + t);

	return [x, y];
}

string.prototype.getAlpha = function(i, degree=1, scale=1){
	p = 2*round(degree);
	return -((pow(2, p)*scale)/pow(this.resolution, p))*pow(i-this.resolution/2, p)+scale;
}

string.prototype.draw = function(){
	background(0);
	push();
	
	t = Date.now() * this.timeScale;

	translate(width/2, height/2);

	if (!this.fixedColor){
		colorMode(HSB);
		this.color_mid =  color((t * 60 + 60) % 360, 255, 255);
		this.color_ends = color((t * 60     ) % 360, 255, 255);
		colorMode(RGB);
	}

	strokeWeight(5);

    this.radius = this.radius_screenSize_ratio*min(width, height);

	var prev_l = this.getCoord(0, t);
	var prev_r = this.getCoord(this.resolution - 1, t);

	for (var i = 0; i < this.resolution/2 + 1; i++) {
		var a = this.getAlpha(i);

		c = lerpColor(this.color_ends, this.color_mid, a);
		c.setRed(c._getRed() * a);
		c.setGreen(c._getGreen() * a);
		c.setBlue(c._getBlue() * a);
		stroke(c);

		coord = this.getCoord(i, t);
		line(prev_l[0], prev_l[1], coord[0], coord[1]);
		prev_l = coord;

		coord = this.getCoord(this.resolution - i, t);
		line(prev_r[0], prev_r[1], coord[0], coord[1]);
		prev_r = coord;
	}

	pop();
}