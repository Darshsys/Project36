var dog,dogSprite,happyDogSprite,foodS,foodStock;
var feed,addFood;
var database;

function preload(){
	dogSprite = loadImage("Dog.png");
  happyDogSprite = loadImage("happydog.png");
}

function setup(){
	createCanvas(1000,500);
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  dog=createSprite(250,300,150,150);
  dog.addImage(dogSprite);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw(){  
  background(46,139,87);

  drawSprites();
  textSize(20);
  fill(255,255,254);
  text("Food Remaning : "+foodS,170,210);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  if(LastFed){
    text("Last Feed : "+ LastFed%12 + " PM", 350,30);
  }else if(LastFed==2){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : "+ LastFed + " AM", 350,30);

}
  addFoods();
  feedDog();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodOjg.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.grtFoodStock(),
    FeedTime:hour()
  })
}