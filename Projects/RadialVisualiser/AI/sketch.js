var stringLines;

function setup() {
  stringLines = new RadialVisualiser(
    radiusFunction = a => 1,
    offsetX=0,
    offsetY=0
  );
  stringLines.resolution = 1024;
  stringLines.rotations = 6;
  stringLines.distortion = 0.25;
  stringLines.distortionMode = RadialVisualiser.MULT;
  stringLines.timeScale = 0.0001;
  stringLines.scale = 1;
  stringLines.rotationRate = 0.0;
  stringLines.fadeEnds = true;
  stringLines.bg_color = color(255);

  loadPage();
}