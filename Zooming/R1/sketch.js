let img1, img2;

let scaleFactor = 1; //current zoom
let minScale = 0.5; //min zoom
let maxScale = 4; //max zoom

let worldOffsetX = 0;
let worldOffsetY = 0; //moves the world instead of the screen 

let canvasW = 3000;
let canvasH = 3000; //canavs width and hight

let swapZoom = 3; //switch img1 and img2

let dragging = false; //are you currently zooming 
let lastMouseX, lastMouseY; //kast mouse position

function preload() {
  img1 = loadImage("Drawing.png"); 
  img2 = loadImage("Drawing2.png"); //loads the images 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
} //creates canvas 

function draw() {
  background(220); //colour of the background 
  constrainPan(); // camera doesnt go outside of the bounds (contraint the drag)
 
  translate(width / 2, height / 2); //center of the canavs

  scale(scaleFactor); //zoom into the center

  translate(worldOffsetX, worldOffsetY); //moves the world baes on the drag

  imageMode(CENTER); //centers the image

  if (scaleFactor < swapZoom) {
    image(img1, 0, 0);
  } else {
    image(img2, 0, 0); //changes the image based on the zoom
  }
}

function mouseWheel(event) {
  let zoomSpeed = 0.001; //controls the zoom speed
  let oldScale = scaleFactor; //restore the original zoom

  scaleFactor -= event.delta * zoomSpeed; // adjust the zoom based on zoom direction
  scaleFactor = constrain(scaleFactor, minScale, maxScale); //keeps zoom within limits

  let scaleChange = scaleFactor / oldScale; //calculates how much zoom 

  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  worldOffsetX -= mx * (scaleChange - 1) / scaleFactor;
  worldOffsetY -= my * (scaleChange - 1) / scaleFactor; //zoom towards the mouse cursor


  return false; // prevents page scrolling
}

function mousePressed() {
  dragging = true;
  lastMouseX = mouseX;
  lastMouseY = mouseY; //starts dragining and stores mouse position
}

function mouseReleased() {
  dragging = false; //stops draginig
}

function mouseDragged() {
  if (dragging) { //Only move if dragging
    let dx = mouseX - lastMouseX;
    let dy = mouseY - lastMouseY; //how much the mouse has moved 

    worldOffsetX += dx / scaleFactor;
    worldOffsetY += dy / scaleFactor; //move by that amount

    lastMouseX = mouseX;
    lastMouseY = mouseY; //update mouse position
  }
}


function constrainPan() {
  let scaledW = canvasW * scaleFactor;
  let scaledH = canvasH * scaleFactor;

  let limitX = max(0, (scaledW - width) / 2) / scaleFactor;
  let limitY = max(0, (scaledH - height) / 2) / scaleFactor;

  worldOffsetX = constrain(worldOffsetX, -limitX, limitX);
  worldOffsetY = constrain(worldOffsetY, -limitY, limitY); // prevents dragginig of the edge and zooming of the edge
}


