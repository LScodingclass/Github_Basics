var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground, invisibleGround, backImage;

var BananaGroup, BananaImage;
var StonesGroup, StoneImage;

var score=0;

function preload(){
  monkey_running =   loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  backImage = loadImage("jungle.jpg");
  
  BananaImage = loadImage("banana.png");
  
  StoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(200,200,400,400);
  ground.addImage("ground",backImage);
  ground.velocityX = -5;
  ground.x = 200;
  ground.scale=1;
  
  monkey = createSprite(50,380,20,50);
  
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1; 
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  BananasGroup = new Group();
  StonesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  console.log(ground.x);
  
  if (gameState===PLAY){
    if (monkey.isTouching(invisibleGround)){
    score = score + 1;
    }

    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.Width/2;
    }
  
    monkey.collide(invisibleGround);
    spawnBananas();
    spawnStones();
  
    if(StonesGroup.isTouching(monkey)){
        gameState = END;
    }
    if (BananasGroup.isTouching(monkey)){
      score = score + 2;
      switch(score){
        case 10: monkey.scale=0.12;
          break;
        case 20: monkey.scale=0.14;
          break;
        case 30: monkey.scale=0.16;
          break;
        case 40: monkey.scale=0.18;
          break;
        default: break;
      }
      BananasGroup.destroyEach();
    }
  }
  else if (gameState === END) {
  monkey.scale=0.1;
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  }
  
  drawSprites();
}


function spawnBananas() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(cloudImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    //add each cloud to the group
    BananasGroup.add(banana);
  }
}

function spawnStones() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(600,165,10,40);
    //obstacle.debug = true;
    stone.velocityX = -(6 + 3*score/100);          
    stone.scale = 0.5;
    stone.lifetime = 300;
    //add each obstacle to the group
    StonesGroup.add(stone);
  }
}