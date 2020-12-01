var tower, towerImage;
var climber, climberImage, climberGroup;
var door, doorImage, doorGroup;
var Play = 1
var End = 0
var gameState = Play
function preload(){
  towerImage = loadImage("tower.png");
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  ghostImage = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
}
function setup(){
  createCanvas(600, 600);
  //spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 3;
  
  ghost = createSprite(300, 300, 15,15)
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleClimberGroup = new Group();
}
function draw(){
  background(0);
  if(gameState === Play) {
  
    
  if(tower.y > 550) {
    tower.y = height/2;
  }
  
  if(keyDown("space")) {
    ghost.velocityY = -2;
  }
  if(keyDown("right")) {
    ghost.x = ghost.x + 2
  }
  if(keyDown("left")) {
    ghost.x = ghost.x + -2
  }
  
  ghost.velocityY = ghost.velocityY + 0.5
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
  
  if(ghost.isTouching(invisibleClimberGroup) || ghost.y > 600) {
   ghost.destroy();
   gameState = End
  }
                                                 
  
  SpawnDoor();
  
  drawSprites();
  }
  if(gameState ===  End){
    fill("white")
    strokeWeight(5)
    stroke("red")
    textSize(100)
    text("Game Over", 50, 250) 
    
  }
}

function SpawnDoor() {
  if(frameCount % 100 === 0) {
  door = createSprite(Math.round(random(150, 400)), -50, 15, 15);
  door.addImage(doorImage);
  door.velocityY = 5
  door.lifetime = 800
  doorGroup.add(door);
 
  climber = createSprite(200, 10, 15, 15);
  climber.addImage(climberImage);
  climber.x = door.x
  climber.velocityY = 5;
  climber.lifetime = 800;
  climberGroup.add(climber);
    
  invisibleClimber = createSprite(200, 15, 15, 15);
  invisibleClimber.width = climber.width
  invisibleClimber.height = 2
  invisibleClimber.x = climber.x
  invisibleClimber.velocityY = 5;
  invisibleClimberGroup.add(invisibleClimber)
     
  ghost.depth = door  .depth                          
  ghost.depth = ghost.depth + 1
  }
}


