
// line drawer is the class
function LineDrawer() {

  //Setup of variables
  let r = 255; // r stands for red and this sets the red variable
  let g = 255; // g stands for green and this sets the green variable
  let b = 255; // b stands for blue and this sets the blue variable

  let speed = 3; // this will set the speed of which the object travels
  let diameter = 50; //diameter sets the size in which any shape is made

  let x1; // this lets the code understand x1 should be allowed
  let y1; // this lets the code understand y1 should be allowed

  // this is what allows the colours to change while in the screen it stands
  // for red, green, blue, black and white
  let angleR = 0;
  let angleG = 0;
  let angleB = 0;
  let angleBW = 0;

  // this is what allows for perlin noise to work
  var xoff = 0.0;
  var xincrement = 0.01;

  // you can allow for the lines to move more gradually and allows for
  // the lines to be moved to random positions on the screen
  let easing = 0.05;
  let randomPosX;
  let randomPosY;

  //this allows for x and y to be a variable
  let x = 0;
  let y = 0;

  // Called from the setup() function.
  this.setup = function() {
    //On setup everything will start in the middle
    x1 = width/2;
    y1 = height/2;
    noStroke(); // no black boarders around shapes

    randomPosX = random(width); // lets the x be random position
    randomPosY = random(height); // lets the y be random position
  }

  // Called from the draw() function.
  this.display = function() {
    // the next two lines allows for the background to refresh and make everything
    // go more opaque
    fill(255,3);
    //rect(0,0,width, height);

    // this is all the easing which allows for the parameters to change,
    //like the position and size
    let targetX = randomPosX;
    let dx = targetX - x;
    x += dx * easing;
    let targetY = randomPosY;
    let dy = targetY - y;
    y += dy * easing;

    //if x and y are smaller then 0.1 the position will be random
    if(dx<0.1 && dy<0.1){
      randomPosX = random(width);
      randomPosY = random(height);
    }

    //console.log(dx);

    //Assign mouseX and mouseY to variables x and y
    //Constrain them within the boundaries of the canvas
    x1 = x;
    y1 = y;
    x1 = constrain(x1, 0, width);
    y1 = constrain(y1, 0, height);

    //Create x2 and y2 and assign the reversed x1 and y1 values
    let x2 = map(x1, 0, width, width, 0);
    let y2 = map(y1, 0, height, height, 0);

    // Get a noise value based on xoff and scale
    // it according to the window's width
    var n = noise(xoff)*width;

    // With each cycle, increment xoff
    xoff += xincrement;

    //Accumulate an additional amount
    //(faster to slower rates)
    angleR += 0.05;
    angleG += 0.025;
    angleB += 0.0125;
    angleBW += 0.009;

    //Get the sin value of each angle
    //sin output is from -1. to 1.
    let sinValR = sin(angleR);
    let sinValG = sin(angleG);
    let sinValB = sin(angleB);
    let sinValBW = sin(angleBW);

    //Map the sin output range from -1,1 to 0,255
    //This will have an effect on the color range
    let r = map(sinValR, -1, 1, 0, 255);
    let g = map(sinValG, -1, 1, 0, 255);
    let b = map(sinValB, -1, 1, 0, 255);
    let bw = map(sinValBW, -1, 1, 0, 255);

    //this allows for the colour to be applied to the lines
    stroke (r, g, b);

    //this codes all the lines and there position
    line(x1, y1, randomPosX, randomPosY);
    line(x2, y1, randomPosX, randomPosY);
    line(x1, y2, randomPosX, randomPosY);
    line(x2, y2, randomPosX, randomPosY);
  }

}

// This is an object created from LineDrawer class.
var drawer;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight); // the canvas siz
  canvas.parent("canvasContainer");
  drawer = new LineDrawer();
  drawer.setup();
}
function draw() {
  drawer.display();
}
