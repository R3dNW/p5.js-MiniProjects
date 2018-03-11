var stringLines;

function heart(a){
  return (1 + sin(a) * ((sqrt(abs(cos(a))) / (sin(a) + 1.85)) - 1)); // * a / (stringLines.rotations * TWO_PI);
}

function setup() {
  stringLines = new RadialVisualiser(
    radiusFunction = a => heart(a),
    offsetX=0,
    offsetY=0.8
  );
  stringLines.resolution = 1024;
  stringLines.rotations = 6;
  stringLines.distortion = 0.65;
  stringLines.distortionMode = RadialVisualiser.ADD;
  stringLines.timeScale = 0.0001;
  stringLines.scale = 1;
  stringLines.rotationRate = 0.0;
  //stringLines.setColors(color(255, 48, 90), color(255, 53, 211));
  stringLines.fadeEnds = true;
  stringLines.bg_color = color(255);

  loadPage();
}