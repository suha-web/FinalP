let img1, img2;

let scaleFactor = 1;
let minScale = 0.5;
let maxScale = 4;

let worldOffsetX = 0;
let worldOffsetY = 0;

function preload() {
  img1 = loadImage("Drawing.png"); 
  img2 = loadImage("Drawing2.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  push();


  translate(width / 2, height / 2);
  scale(scaleFactor);
  translate(worldOffsetX, worldOffsetY);

  imageMode(CENTER);

 
  if (scaleFactor < 2) {
    image(img1, 0, 0);
  } else {
    image(img2, 0, 0);
  }

  pop();
}

function mouseWheel(event) {
  let zoomSpeed = 0.001;

  scaleFactor -= event.delta * zoomSpeed;
  scaleFactor = constrain(scaleFactor, minScale, maxScale);
}

function mouseDragged() {
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;

  worldOffsetX += dx / scaleFactor;
  worldOffsetY += dy / scaleFactor;
}
