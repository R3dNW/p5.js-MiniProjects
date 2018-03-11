var stringLines;

function preload() {

}

function setup() {
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

  loadPage();
}