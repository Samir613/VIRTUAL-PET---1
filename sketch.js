var database;
var dog,dogImage,happydogImage,food,foodImage,foodStock,foodS;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
  foodImage = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500, 500);

 food = createSprite(250,400,50,50);
  food.addImage(foodImage);
  food.scale = 0.3;

  dog = createSprite(400,150);
  dog.addImage(dogImage);
  dog.scale = 0.2;


  database = firebase.database();
  foodS = database.ref("Food");
  foodS.on("value",readStock);

  foodS.set(20);


}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  
  //add styles here
  textSize(32);
  fill("black");
  text("FOOD REMAINING : "+foodStock,50,300);
  textSize(16);
  text("Press UP_ARROW to feed the pet",50,70)
  decreaseFood();
  if(foodStock===0){
text("Press space to reset",200,200);
  }
if(keyDown("space")){
foodStock=20
}
}

function readStock(data){
  foodStock = data.val();
}
function writeStock(x){

database.ref('/').update({
  Food:x
})
}
function decreaseFood(){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock)
  foodS = database.ref("Food");
  foodStock = foodStock - 1;
  foodS.set(foodStock);
  dog.addImage(happydogImage);
  food.x = 350;
  food.y = 200;
  food.scale = 0.1;

  }
  if(keyWentUp(UP_ARROW)){
    foodStock = foodStock;
    dog.addImage(dogImage);
    food.x = 250;
    food.y = 400;
    food.scale = 0.2;
  }
}



  
