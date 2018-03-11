var stringLines;

function preload() {

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noiseSeed(255);
  stringLines = new RadialVisualiser(
    radiusFunction = a => 1 - 4 * pow((a / (stringLines.rotations * TWO_PI)) - 0.5, 2),
    offsetX=0,
    offsetY=0
  );
  stringLines.resolution = 1024;
  stringLines.rotations = 6.56;
  stringLines.distortion = 0.25;
  stringLines.rotationRate = 0.5;
  stringLines.timeScale = 0.0001;
  stringLines.scale = 1;
  stringLines.rotationRate = 0.0;
  stringLines.fadeEnds = true;
  stringLines.bg_color = color(255);
}

function draw() {
  background(255);

  strokeWeight(5);
  stringLines.draw(width / 2, height / 2);
}

window.onresize = function () {
  var w = window.innerWidth;
  var h = window.innerHeight;
  resizeCanvas(w, h);
  width = w;
  height = h;
}