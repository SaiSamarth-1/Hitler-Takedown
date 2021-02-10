
var playerImg,playerImg2,playerImg3,playerShooting1,playerShooting2,playerStationary,player,playerHealth,score;
var backGroundimg, backGround,gameOverImage,youWinImage;
var bullets, bulletCrates, bullet, bulletCrateImage,bulletCratesGroup,bulletGroup, megaBullet;
var soldierImage,soldier,soldierGroup,soldierBullet,soldierBulletGroup,soldiers;
var megaNazi,megaNaziGroup,megaNaziHealth,megaNazis,maZi,megaNaziBullet,megaNaziBulletGroup;
var hitler, hitlerGroup, hitlerImage, hitlerHealth, hitlerBullet, hitlerBulletGroup;
var gameState, START=0, PLAY=1, END=2, WIN=3;
var intro, introImg,controlsImg,controls;

function preload() {
  playerImg = loadImage("player1.png");
  playerImg2 = loadImage("player2.png");
  playerImg3 = loadImage("player3.png");
  playerShooting1 = loadImage("playershooting1.png");
  playerShooting2 = loadImage("playershooting2.png");
  playerStationary = loadImage("playerStationary.png");

  hitlerImage = loadImage("hitler2.png");

  backGroundimg = loadImage("bg.jpg");

  bulletCrateImage = loadImage("crate.png");

  soldierImage = loadImage("nazistaying.png");

  gameOverImage = loadImage("gameover.png");

  youWinImage = loadImage("youwin.jpg");

  introImg = loadImage("intro.png");

  controlsImg = loadImage("controls.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  backGround = createSprite(windowWidth/2,windowHeight/2,50,50);
  backGround.addImage(backGroundimg);
  backGround.scale = 11;
  
  player = createSprite(windowWidth-windowWidth/2 - 500, windowHeight/2+100, 50, 50);
  player.addAnimation("running", playerImg, playerImg2, playerImg3);
  player.addAnimation("shooting", playerShooting1, playerShooting2);
  player.addAnimation("stationary", playerStationary);
  player.addAnimation("running_back", playerImg3, playerImg2, playerImg);
  player.scale = 0.5;

  intro = createSprite(windowWidth-windowWidth/2 - 400, windowHeight/2+100, 50, 50);
  intro.addImage(introImg);
  intro.scale = 0.3;

  controls = createSprite(0+windowWidth-120,0+windowHeight-20, 50, 50);
  controls.addImage(controlsImg);
  controls.scale = 0.3;

  soldiers = 0;
  megaNazis = 0;
  maZi = 0;

  bullets = 10;
  playerHealth = 100;
  score = 0;

  megaBullet = 0;

  bulletCratesGroup = createGroup();
  soldierGroup = createGroup();
  bulletGroup = createGroup();
  soldierBulletGroup = createGroup();
  megaNaziGroup = createGroup();
  megaNaziBulletGroup = createGroup();
  hitlerGroup = createGroup();
  hitlerBulletGroup = createGroup();


  gameState = START;

}

function draw() {
  background(0);

  if(gameState === START){
    textSize(50);
    text("WAKE UP SOLDIER!", windowWidth/2-100,windowHeight/2);
    textSize(15);
    text("Press W to wake up", windowWidth/2-100,windowHeight/2+30);
    if(keyWentDown("W")){
      gameState = PLAY;
    }
  }

  if(gameState === PLAY){
    nazi();

  if (backGround.x < 0){
    backGround.x = backGround.width/2;
  }
  
  isTouchingForAll();


  if(frameCount % 180 === 0){
    crateGen();
  }

  if(keyDown("B") && bullets > 0){
    bulletShoot();
    player.changeAnimation("shooting", playerShooting1, playerShooting2);
  }
  else if(keyDown(RIGHT_ARROW)){
    player.changeAnimation("running", playerImg, playerImg2, playerImg3);
    bulletCratesGroup.setVelocityXEach(-9);
    backGround.velocityX=-9
    soldierGroup.setVelocityXEach(-9);
    intro.velocityX = -9;
  }
  else if(keyDown(LEFT_ARROW)){
    player.changeAnimation("running_back", playerImg, playerImg2, playerImg3);
    bulletCratesGroup.setVelocityXEach(9);
    backGround.velocityX=9
    soldierGroup.setVelocityXEach(9);
    intro.velocityX = 9;
  }
  else if(keyDown(UP_ARROW) && player.y > 0){
    player.changeAnimation("running", playerImg, playerImg2, playerImg3);
    player.y = player.y-9
  }
  else if(keyDown(DOWN_ARROW) && player.y < windowHeight){
    player.changeAnimation("running", playerImg, playerImg2, playerImg3);
    player.y = player.y+9
  }
  else {
    player.changeAnimation("stationary", playerStationary);
    bulletCratesGroup.setVelocityXEach(0);
    backGround.velocityX=0
    soldierGroup.setVelocityXEach(0);
    intro.velocityX = 0;
  }

  if(playerHealth < 1){
    gameState = END;
  }

  console.log(maZi);
  
  drawSprites();

  text(maZi,windowWidth-windowWidth+500,windowHeight-windowHeight+10);
  
}

  if(gameState === END){
    background(255);
    imageMode(CENTER);
    image(gameOverImage,windowWidth/2,windowHeight/2);
  }

  if(gameState === WIN){
    background(255);
    imageMode(CENTER);
    image(youWinImage,windowWidth/2,windowHeight/2, windowWidth,windowHeight);
  }

  textSize(12.5);
  text("Bullets: "+ bullets, windowWidth-windowWidth+10,windowHeight-windowHeight+10);

  textSize(12.5);
  text("Health: "+ playerHealth, windowWidth-windowWidth+100,windowHeight-windowHeight+10);
  textSize(12.5);
  text("Score: "+ score, windowWidth-windowWidth+190,windowHeight-windowHeight+10);

}

function bulletShoot(){
  if(frameCount % 6 === 0){
    bullet = createSprite(player.x,player.y, 5,5)
    bullet.velocityX = 30;
    bullet.lifetime = 40
    bullets = bullets-1
    bulletGroup.add(bullet);
  }
}

function crateGen(){
  var randomX = Math.round(random(0,windowWidth));
  var randomY = Math.round(random(0,windowHeight));
  bulletCrates = createSprite(randomX,randomY,30,30);
  bulletCrates.addImage(bulletCrateImage);
  bulletCrates.scale = 0.5
  bulletCrates.lifetime = 100;
  bulletCratesGroup.add(bulletCrates);
}

function nazi(){
  var randomY = Math.round(random(0,windowHeight));
  if(frameCount % 100 === 0 && soldiers === 0 && megaNazis === 0 && maZi < 10){
    soldier = createSprite(windowWidth-150, randomY, 50, 50);
    soldier.addImage(soldierImage);
    soldier.scale = 2;
    soldierGroup.add(soldier);
    soldiers = 1
  }
  if (soldier && frameCount % 35=== 0 && soldiers === 1 && megaNazis === 0 && maZi < 10){
          soldierbullet = createSprite(soldier.x,soldier.y, 5,5)
          soldierbullet.velocityX = -30;
          soldierbullet.lifetime = 40;
          soldierBulletGroup.add(soldierbullet);
  }

  if(score % 25 === 0 && score > 0){
    megaNazi = createSprite(windowWidth-150,windowHeight/2,5,5);
    megaNazi.addImage(soldierImage);
    megaNazi.scale = 3;
    megaNaziGroup.add(megaNazi);
    megaNazis = megaNazis+1;
    megaNaziHealth = 100;
    score = score+1;
  }

  if(megaNazi && frameCount % 25=== 0 && soldiers === 0 && megaNazis === 1){
    megaNaziBullet = createSprite(megaNazi.x,megaNazi.y,5,5);
    megaNaziBullet.velocityX = -30;
    megaNaziBullet.lifetime = 40;
    megaNaziBulletGroup.add(megaNaziBullet);
  }

  if(maZi < 11 && maZi > 9){
    hitler = createSprite(windowWidth-150, windowHeight/2);
    hitler.addImage(hitlerImage);
    hitler.scale=3;
    hitlerGroup.add(hitler);
    megaBullet = megaBullet+1;
    hitlerHealth = 200;
    maZi = maZi + 1;
  }
  if(hitler && frameCount % 15=== 0 && soldiers === 0 && megaNazis === 0){
    hitlerBullet = createSprite(hitler.x,hitler.y,5,5);
    hitlerBullet.velocityX = -30;
    hitlerBullet.lifetime = 45
    hitlerBulletGroup.add(hitlerBullet);
  }
  //text("Health: " + hitlerHealth, hitler.x, hitler.y - hitler.width/2 - 60);
}

function isTouchingForAll(){
    if (bulletCratesGroup.isTouching(player)){
      for(var i=0;i<bulletCratesGroup.size();i++){
        if(player.isTouching(bulletCratesGroup.get(i))){      
          bulletCratesGroup.get(i).destroy();
        }
    }
    if(playerHealth < 98){
      playerHealth = playerHealth+2;
    }
    bullets = bullets+5 
  }
  if (soldierGroup.isTouching(bulletGroup)){
    for(var i=0;i<soldierGroup.size();i++){
      if(bulletGroup.isTouching(soldierGroup.get(i))){      
        soldierGroup.get(i).destroy();
        soldiers = 0
        score = score+5
      }
  }
}

if (megaNaziGroup.isTouching(bulletGroup)){
  for(var i=0;i<megaNaziGroup.size();i++){
    if(bulletGroup.isTouching(megaNaziGroup.get(i))){      
      megaNaziHealth = megaNaziHealth-5
    }
  }
}

if (bulletGroup.isTouching(hitlerGroup)){   
      hitlerHealth = hitlerHealth-10;
}

if (bulletGroup.isTouching(soldierGroup)){
  for(var i=0;i<bulletGroup.size();i++){
    if(soldierGroup.isTouching(bulletGroup.get(i))){      
      bulletGroup.get(i).destroy();
      }
    }
  }

  if(megaNaziHealth === 0){
    megaNazis = 0;
    maZi = maZi + 1;
    megaNaziGroup.destroyEach();
    megaNaziHealth = -1
    score = score +4
  }

  if(hitlerHealth < 1){
    hitlerGroup.destroyEach();
    gameState = WIN;
  }

  if(soldierBulletGroup.isTouching(player)){
    playerHealth = playerHealth-1
  }

  if(megaNaziBulletGroup.isTouching(player)){
    playerHealth = playerHealth-4
  }

  if(hitlerBulletGroup.isTouching(player)){
    playerHealth = playerHealth-7
  }
}