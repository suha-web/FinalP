let img;
let img1;
let img2;

let scaleFactor = 1; //current zoom level 1 = 100%
let minScale;
let maxScale; 
let worldOffsetX = 0;
let worldOffsetY = 0;

let zoomTargetX; 
let zoomTargetY; //where the zooms goes towrds 

function preload() {
  img = loadImage("Drawing.png"); 
  img1 = loadImage("Drawing1.png"); 
  img2 = loadImage("Drawing2.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  minScale = max(windowWidth / img.width, windowHeight / img.height); // calculates minsacle to base image (image)
  scaleFactor = minScale; // sets zoom fully zoomed out

 
  let smallHeight = 300;
  let smallWidth = 300; // sets image size
  let smallX = (img.width - smallWidth) / 2;
  let smallY = (img.height - smallHeight) / 2; // centers image

  let tinyW = smallWidth * 0.5; 
  let tinyH = smallHeight * 0.5;
  let tinyX = smallX + (smallWidth - tinyW) / 2;
  let tinyY = smallY + (smallHeight - tinyH) / 2;

  zoomTargetX = tinyX + tinyW / 2;
  zoomTargetY = tinyY + tinyH / 2;

  maxScale = min(width / tinyW, height / tinyH);

  worldOffsetX = zoomTargetX - width / (2 * scaleFactor);
  worldOffsetY = zoomTargetY - height / (2 * scaleFactor);
}

function draw() {
  background(0);

  scaleFactor = constrain(scaleFactor, minScale, maxScale);

  image(
    img,
    (0 - worldOffsetX) * scaleFactor,
    (0 - worldOffsetY) * scaleFactor,
    img.width * scaleFactor,
    img.height * scaleFactor
  );

  let smallWidth = 300;
  let smallHeight = 300;
  let smallX = (img.width - smallWidth) / 2;
  let smallY = (img.height - smallHeight) / 2;

  image(
    img1,
    (smallX - worldOffsetX) * scaleFactor,
    (smallY - worldOffsetY) * scaleFactor,
    smallWidth * scaleFactor,
    smallHeight * scaleFactor
  );

  let tinyW = smallWidth * 0.7; 
  let tinyH = smallHeight * 0.7;
  let tinyX = smallX + (smallWidth - tinyW) / 2;
  let tinyY = smallY + (smallHeight - tinyH) / 2;

  image(
    img2,
    (tinyX - worldOffsetX) * scaleFactor,
    (tinyY - worldOffsetY) * scaleFactor,
    tinyW * scaleFactor,
    tinyH * scaleFactor
  );
}

function mouseWheel(event) {
  let zoomSpeed = 0.001;
  let prevScale = scaleFactor;

  scaleFactor -= event.delta * zoomSpeed;
  scaleFactor = constrain(scaleFactor, minScale, maxScale);

  if (scaleFactor !== prevScale) {
    worldOffsetX = zoomTargetX - width / (2 * scaleFactor);
    worldOffsetY = zoomTargetY - height / (2 * scaleFactor);
  }

  return false;
}
