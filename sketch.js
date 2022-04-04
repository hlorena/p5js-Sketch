//Variables
//Morning Gradient
let topcolor;
let bottomcolor;

//Evening Gradient
let topcolor2;
let bottomcolor2;

//Light Beam Array
let circleY = [];

//Windmill
var angle = 0.0;

//Tumbleweed Class
let myTumbleweed;

//Crawling Lizard
var xlizard = 550;

//Clouds
var xoff = 0;

//Background Music
var music;


function preload() {
  img = loadImage("images/tumbleweed.png");
  img2 = loadImage("images/lizard.png");
  img3 = loadImage("images/cloud1.png");
  img4 = loadImage("images/cloud2.png");
}

function setup() {
  createCanvas(1200, 650);
  myTumbleweed = new Tumbleweed(1, 1);

  //Array using a for loop. The index variable is declared, the number of circles is determined less than 1000 and the limit is established to the canvas height.
  for (let i = 0; i < 1000; i++) {
    circleY[i] = random(height);
  }

  //Background music - there is usually a 2 second delay
  music = loadSound("JackAdkins-Blue.mp3", loaded);
}

function loaded() {
  music.play();
}

function draw() {
  //Music
  music.setVolume(1);

  //Morning Gradient
  topcolor = color(132, 160, 148);
  bottomcolor = color(231, 200, 145)
  //The for loop creates the gradient line by line starting from 0 to the height of the y-axis.The map function controls the colour value.

  for (let y = 0; y < height; y++) {
    n = map(y, 0, height, 0, 1);
    let newcolor = lerpColor(topcolor, bottomcolor, n);
    stroke(newcolor);
    line(0, y, width, y);
  }

  //Interaction and Array
  if (mouseIsPressed === true) {
    //Evening Gradient
    topcolor2 = color(14, 7, 46);
    bottomcolor2 = color(42, 19, 37)

    for (let y = 0; y < height; y++) {
      n = map(y, 0, height, 0, 1);
      let newcolor = lerpColor(topcolor2, bottomcolor2, n);
      stroke(newcolor);
      line(0, y, width, y);
    }

    //Array: Beads of Light
    for (let i = 0; i < circleY.length; i++) {
      let circleX = width * i / circleY.length;
      noStroke();
      fill(255);
      circle(circleX, circleY[i], 2);
      circleY[i]++;

      if (circleY[i] > height) {
        circleY[i] = 0;
      }
    }

    //Cracking egg
    fill(255);
    ellipse(width / 2, 270, 250, 290);
    fill(255, 255, 142);
    ellipse(width / 2, 230, 150);
    fill(192, 145, 103);
    arc(520, height / 3, 250, 320, PI - QUARTER_PI, -QUARTER_PI, PIE);
    arc(690, height / 3, 250, 320, PI + QUARTER_PI, QUARTER_PI, PIE);

    beginShape();
    fill(192, 145, 103);
    noStroke();
    vertex(605, 110);
    vertex(560, 200);
    vertex(500, 230);
    vertex(480, 290);
    vertex(420, 310);
    endShape(CLOSE);

    beginShape();
    fill(192, 145, 103);
    vertex(610, 100);
    vertex(625, 200);
    vertex(695, 240);
    vertex(710, 300);
    vertex(790, 315);
    endShape(CLOSE);
  } else {
    //The sun's default position
    noStroke();
    fill(255, 255, 142);
    ellipse(width / 2, 450, 300, 300);

    //Floating Clouds
    var cloudx = map(noise(xoff), 0, 4, 0, width);

    xoff += 0.001;

    image(img3, cloudx, 100, 350, 120);
    image(img4, cloudx + 450, 250, 350, 120);
  }


  //Middleground
  //Canyons
  strokeWeight(7);
  stroke(225, 164, 110);
  strokeJoin(ROUND);
  fill(225, 164, 110);
  beginShape();
  vertex(0, 500);
  vertex(90, 500);
  vertex(110, 400);
  vertex(150, 400);
  vertex(160, 420);
  vertex(180, 420);
  vertex(190, 480);
  vertex(210, 480);
  vertex(210, 380);
  vertex(220, 380);
  vertex(220, 400);
  vertex(230, 400);
  vertex(240, 500);
  vertex(255, 500);
  vertex(255, 480);
  vertex(265, 470);
  vertex(265, 450);
  vertex(350, 450);
  vertex(350, 480);
  vertex(370, 480);
  vertex(370, 500);
  vertex(400, 510);
  vertex(width, 550);
  vertex(width, 700);
  vertex(0, 660);
  endShape(CLOSE);

  //Sand Dunes
  stroke(188, 123, 95);
  fill(188, 123, 95);
  beginShape();
  vertex(0, 650);
  vertex(180, 560);
  vertex(230, 550);
  vertex(300, 560);
  vertex(380, 540);
  vertex(455, 545);
  vertex(510, 530);
  vertex(600, 510);
  vertex(740, 480);
  vertex(760, 480);
  vertex(810, 490);
  vertex(860, 500);
  vertex(950, 520);
  vertex(1000, 500);
  vertex(width, 440);
  vertex(width, 700);
  vertex(0, 660);
  endShape(CLOSE);

  //Windmill
  strokeWeight(6);
  stroke(150);
  line(900, 420, 900, 530);
  fill(180);
  //Isolating the x,y translation using push/pop
  push();
  //The translate function has moved the x and y axis to the new location
  translate(900, 420);
  rotate(angle);
  rectMode(CENTER);
  noFill();
  strokeWeight(1);
  stroke(0);
  noStroke();
  fill(220);
  rect(20, 0, 40, 12);
  rect(-20, 0, 40, 12);
  rect(0, -20, 12, 40);
  rect(0, 20, 12, 40);
  fill(100);
  ellipse(0, 0, 10, 10);
  angle += 0.01;
  pop();

  //Distant traintracks
  strokeWeight(7);
  stroke(97, 73, 37);
  strokeCap(SQUARE);
  //The index is the y-axis, the equation sets the limit to 585 height and adds 20px of space between each track
  for (var i = 495; i < 585; i += 20) {
    line(800, i, 840, i + i / 40);
  }
  strokeWeight(1);
  stroke(0);
  line(815, 486, 805, 595);
  line(835, 490, 825, 596);

  //Foreground
  stroke(160, 95, 73);
  fill(160, 95, 73);
  beginShape();
  vertex(0, 440);
  vertex(40, 460);
  vertex(60, 470);
  vertex(100, 490);
  vertex(120, 500);
  vertex(170, 510);
  vertex(240, 540);
  vertex(240, 540);
  vertex(300, 550);
  vertex(380, 570);
  vertex(490, 565);
  vertex(550, 575);
  vertex(700, 590);
  vertex(930, 620);
  vertex(width, 630);
  vertex(width, 650);
  vertex(0, 650);
  endShape(CLOSE);

  //Cacti
  cactus(130, 480);
  cactus(370, 550);
  cactus(770, 550);
  cactus(1130, 575);

  //Crawling Lizard
  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) {
      xlizard--;
    } else if (keyCode == RIGHT_ARROW) {
      xlizard++;
    }
  }
  image(img2, xlizard, 540, 200, 110);

  //Front Cacti
  cactus(250, 600);
  cactus(970, 585);

  //Creating a function for a repeated object optimizes the code instead of drawing and plotting each individual cactus
  function cactus(x, y) {
    push();
    translate(x, y);
    noFill();
    stroke(77, 68, 38);
    strokeWeight(25);
    strokeCap(ROUND);
    line(-45, -45, -45, 45);
    strokeWeight(15);
    arc(-45, -30, 70, 80, 0, PI, OPEN);
    strokeWeight(1);
    stroke(175, 173, 137);
    line(-45, -55, -45, 55);
    line(-38, -53, -38, 53);
    line(-52, -53, -52, 53);
    line(-60, -2, -60, 14);
    line(-30, -2, -30, 14);
    line(-70, 7, -70, -15);
    line(-22, 8, -22, -15);
    line(-78, 1, -78, -36);
    line(-14, 1, -14, -36);
    line(-6, -9, -6, -35);
    line(-85, -14, -85, -36);
    pop();
  }

  //Tumbleweed
  //increase to the value of .xspeed
  myTumbleweed.x += myTumbleweed.xSpeed;

  //If x is less than 0 go forward by 1, or greater than the width go back by 1
  if (myTumbleweed.x < 0 || myTumbleweed.x > width) {
    //Multiplying a negative number with itself will cause the integer to alternate between negative and positive
    myTumbleweed.xSpeed *= -1;
  }
  image(img, myTumbleweed.x, 600, 50, 50);
}

class Tumbleweed {
  constructor(x, xSpeed) {
    this.x = x;
    this.xSpeed = xSpeed;
  }
}
