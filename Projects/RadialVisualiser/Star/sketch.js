var stringLines;

function setup() {
  stringLines = new RadialVisualiser(
    radiusFunction = a => tan(5 * a),
    offsetX=0,
    offsetY=0
  );
  stringLines.resolution = 1024;
  stringLines.rotations = 6;
  stringLines.distortion = 0.0;
  stringLines.rotationRate = 0.5;
  stringLines.timeScale = 0.0001;
  stringLines.scale = 1;
  stringLines.rotationRate = 0.0;
  stringLines.fadeEnds = true;
  stringLines.bg_color = color(255);

  loadPage();
}