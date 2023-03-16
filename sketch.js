var canvas;
var backgroundImage, dog1_img, dog2_img, track;
var blueBone_img, whiteBone_img, lifeImage;
var obstacle1Image, obstacle2Image;
var database, gameState;
var blastImage;
var form, player, playerCount;
var allPlayers, dog1, dog2, speedBoneGroup, protectionBoneGroup, obstaclesGroup;
var dogs = [];

function preload() {
  backgroundImage = loadImage("assets/background.png");
  dog1_img = loadImage("assets/RunningPuppy.png");
  dog2_img = loadImage("assets/RunningPuppy2.png");
  track = loadImage("assets/track.jpg");
  blueBone_img = loadImage("assets/SpeedBone.png");
  whiteBone_img = loadImage("assets/ProtectionBone.png");
  obstacle1Image = loadImage("assets/CatRobot.png");
  obstacle2Image = loadImage("assets/Yarnball.png");
  lifeImage = loadImage("assets/life.png");
  blastImage = loadImage("assets/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
  
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
