var canvas;
var backgroundImage, plr1_img, plr2_img, maze;
var powerUpsImage, lifeImage, equipmentImage;
var obstacle1Image;
var database, gameState;
var form, player, playerCount;
var allPlayers, plr1, plr2, powerUps, equipment, obstacles;
var players = [];


function preload() {
  backgroundImage = loadImage("./assets/maze_bg.avif");
  plr1_img = loadImage("../assets/plr1(blue).png");
  plr2_img = loadImage("../assets/plr1(blue).png");
  equipmentImage = loadImage("./assets/equipment.png");
  powerUpsImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/obstacle1.png");
  obstacle2Image = loadImage("./assets/obstacle2.png");
  lifeImage = loadImage("./assets/life.png");
  blastImg = loadImage("./assets/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  if (gameState === 0) {
    background(backgroundImage)
    textSize(23)
    fill('rgba(0,0,0,0.5)')
    rectMode(CENTER)
    rect(width-200, height-100, 370, 200)
    fill("white")
    text("RULES", width-260, height-130)
    textSize(18)
    text("1) Use arrow keys to move around", width-370, height -105)
    text("2) Collect laser guns to shoot your opponent", width -370, height-80)
    text("3) Avoid the spikes in order to not die", width-370, height-55)
  }
  if (playerCount === 2) {
    game.update(1);
    background(0)
  }

  if (gameState === 1) {
    game.play();
   // background(0)
  }

  /*if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }*/
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
