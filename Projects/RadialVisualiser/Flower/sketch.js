var stringLines;

function flower(a, degree){
  return cos(degree*a);
}

function setup() {
  stringLines = new RadialVisualiser(
    radiusFunction = a => flower(a, 2.71828182846),
    offsetX=0,
    offsetY=0
  );
  stringLines.resolution = 1024;
  stringLines.rotations = 6;
  stringLines.distortion = 0.45;
  stringLines.distortionMode = RadialVisualiser.MULT;
  stringLines.timeScale = 0.0001;
  stringLines.scale = 1;
  stringLines.rotationRate = 0.0;
  stringLines.fadeEnds = true;
  stringLines.bg_color = color(255);

  loadPage();
}