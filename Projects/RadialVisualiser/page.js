var bg_color;
var white, black;
var button;

function loadPage(){
    createCanvas(window.innerWidth, window.innerHeight);
  
    noiseSeed(255);
    
    white = color(255);
    black = color(0);

    button = createButton("Background");
    button.style("font-family: 'Consolas', Courier, sans-serif")
    button.position(20, 20);
    button.mousePressed(changeBG);
  
    changeBG();
}

function changeBG(){
    if (bg_color == black){
      bg_color = white;
  
      button.style("background-color", white);
      button.style("color", black);
    }
    else {
      bg_color = black;
  
      button.style("background-color", black);
      button.style("color", white);
    }
  
    button.style("border-style", "none");
  }

  function draw() {
    stringLines.bg_color = bg_color;
    background(bg_color);
  
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