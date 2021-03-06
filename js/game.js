// Creates Canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);
canvas.style.border

///////////////////////////////////////////
//              Objects                  //
///////////////////////////////////////////


var char = function(image, posX, posY, facing, speed, hasObject, attackDistance, attackWidth)
{
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.facing = facing;
    this.speed = speed;
    this.hasObject = hasObject;
    this.attackDistance = attackDistance;
    this.attackWidth = attackWidth;

}
var object = function(image, posX, posY, attackDistanceIncrease, attackWidthIncrease, isPickedUp)
{
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.attackDistanceIncrease = attackDistanceIncrease;
    this.attackWidthIncrease = attackWidthIncrease;
    this.isPickedUp = isPickedUp;
}

var tileSpace = function(image, posX, posY)
{
    this.image = image;
    this.posX = posX;
    this.posY = posY;
}

var enemy = function(image, posX, posY, speed)
{
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
}

var hypotenus = 0;
var hypotenus2 = 0;
var cos = 0;
var sin = 0;
var enemyMovement = function()
{
    for(var i = 0; i < enemyList.length; i++){

        xDistance = player.posX - enemyList[i].posX; // x
        yDistance = player.posY - enemyList[i].posY; // y
        hypotenus = Math.sqrt(Math.pow(xDistance, 2)+Math.pow(yDistance, 2));
       
       if(hypotenus < 15){
           GameOver();
       }
       
       cos = Math.abs((Math.cos(xDistance/hypotenus)));
       sin = Math.abs((Math.sin(yDistance/hypotenus)));
       
       if(xDistance >= 0){
           enemyList[i].posX += Math.cos(cos);
       }
       else{
           enemyList[i].posX -= Math.cos(cos);
       }
       if(yDistance >= 0){
           enemyList[i].posY += Math.sin(sin);
       }
       else{
           enemyList[i].posY -= Math.sin(sin);
       }

       ///////// Punch /////////////////////
      // hypotenus2 = distanceCalc(-player.attackWidth*2.5, enemyList[i].posX, -player.attackDistance*7.5, enemyList[i].posY);
       if(boolAttack == true){
       xDistance = player.posX - enemyList[i].posX; // x
        yDistance = player.posY-10 - enemyList[i].posY; // y
        hypotenus2 = Math.sqrt(Math.pow(xDistance, 2)+Math.pow(yDistance, 2));
       
        if(hypotenus2 < 30){
           enemyList[i].posX = -100;
           enemyList[i].posY = -100;
           enemyList.splice(i, 1);
       }
       }


    }

}


//////////////////////////////////////////////////////
/////               Images                        ////
//////////////////////////////////////////////////////
var wallImage = new Image();
wallImage.src = "img/wall.png";

var sandImage = new Image();
sandImage.src = "img/sand.png";

var punchImage = new Image();
punchImage.src = "img/punch.png"
// 50 by 50 pixel

var backgroundImage = new Image();
backgroundImage.src = "img/whiteBackground.png"
var background = new object(backgroundImage,0,0,0,0, false);

var objectImage = new Image();
objectImage.src = "img/objectPlaceHolder.png";
var objectTest = new object(objectImage, 50, 50, 0, 0, false);
var objectTest2= new object(objectImage, 300, 200, 0, 0, false);

var playerImage = new Image();
playerImage.src = "img/charPlaceHolder.png";
var player = new char(playerImage, 100, 100, 0, 12, false, 3, 3);

var enemyImage = new Image();
enemyImage.src = "img/enemy.png"
var enemy1 = new enemy(enemyImage, 500, 10, 1);

var enemyList = [enemy1];

var tileSet = [
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

];



var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	e.preventDefault();
}, false);

addEventListener("keyup", function (e) {
	keysDown[e.keyCode] = false;
}, false);

var boolAttack = false;
var listOfObjects = [objectTest, objectTest2];
var totalPosX = 0;
var totalPosY = 0;
var totalRotation = 0;
var playerMovment = function(modifier)
{

///////// Position movment /////////////////////
    if (keysDown[65] == true) { // Player holding left
        totalPosX =(-1)*(player.speed * modifier * player.speed);
	}
    if (keysDown[68] == true) { // Player holding right
		totalPosX = player.speed * modifier * player.speed;
	}
    player.posX += totalPosX;
    totalPosX = totalPosX * 0.0;
    if(player.posX >= 590){
        player.posX= 590;
    }
    if(player.posX <= 10){
        player.posX = 10;
    }  

	if (keysDown[87] == true) { // Player holding up
		totalPosY =(-1)*(player.speed * modifier * player.speed);
	}
	if (keysDown[83] == true) { // Player holding down
		totalPosY =(player.speed * modifier * player.speed);
	}
    player.posY += totalPosY;
    totalPosY = totalPosY * 0.0;

    if(player.posY <= 10){
        player.posY = 10;
    }
    if(player.posY >= 590){
        player.posY = 590;
    }
    wallCalculationPlayer();

///////////////////  rotation movment ///////////////////
    
    if(keysDown[39] == true){
        totalRotation += 15;
    }
    if(keysDown[37] == true){
        totalRotation -= 15;
    }
    if(totalRotation < -720){
        totalRotation += 720;
    }
    if(totalRotation > -720){
        totalRotation -= 720;
    }


    ///////////////////  player actions  ////////////////////

     if (player.hasObject == false ){
         if (keysDown[69] == true){
            pickupObject();
         }
    }
    else{
        if(keysDown[69] == true){
            dropObject();
        }
    }
    if(keysDown[32] == true){
        spawnEnemy();
        boolAttack = true;
    }
    else{
        boolAttack = false;
    }
    
}

var wallCalculationPlayer = function(){
    for(var i = 0; i < tileList.length; i++){
        // left
        if((player.posX-tileList[i].posX)>=-22.5 && (player.posX-tileList[i].posX)<=0 && player.posY<=(tileList[i].posY+12.5) && player.posY>=(tileList[i].posY-12.5)){
            player.posX = tileList[i].posX-22.5;
            totalPosX = 0;
        }
        // right
        if((player.posX-tileList[i].posX)<=22.5 && (player.posX-tileList[i].posX)>=0 && player.posY<=(tileList[i].posY+12.5) && player.posY>=(tileList[i].posY-12.5)){
            player.posX = tileList[i].posX+22.5;
            totalPosX = 0;
        }
        // up
        if((player.posY-tileList[i].posY)>=-22.5 && (player.posY-tileList[i].posY)<=0 && player.posX<(tileList[i].posX+12.5) && player.posX>=(tileList[i].posX-12.5)){
            player.posY = tileList[i].posY-22.5;
            totalPosY = 0;
        }
        // down
         if((player.posY-tileList[i].posY)<=22.5 && (player.posY-tileList[i].posY)>=0 && player.posX<=(tileList[i].posX+12.5) && player.posX>=(tileList[i].posX-12.5)){
            player.posY = tileList[i].posY+22.5;
            totalPosY = 0;
        }

    }
}

var pickupObject = function(){
    var rank = -1;
    var dis2 = 101;
    for(var i = 0; i < listOfObjects.length; i++){
        var dis = distanceCalc(player.posX, listOfObjects[i].posX, player.posY, listOfObjects[i].posY);
        if ((player.hasObject==false)&&(dis<101)){
            if(dis<dis2){
                rank = i;
                dis2 = dis;
            }
        }
    }
    if(rank!=-1){
        listOfObjects[rank].isPickedUp = true;
        player.hasObject = true;
    }
}

var distanceCalc = function(posX1, posX2, posY1, posY2){
    var distance = Math.abs(Math.sqrt(Math.pow(posX1-posX2,2)+Math.pow(posY1-posY2,2)));
    return distance;
}

var dropObject = function(){
    player.hasObject = false;
    for (var i = 0; i<listOfObjects.length; i++){
        listOfObjects[i].isPickedUp = false;
    }
}
var attackAnimation = function(){
    ctx.save();
    ctx.translate(player.posX, player.posY);
    ctx.rotate(totalRotation*Math.PI/360);
    ctx.drawImage(punchImage, -player.attackWidth*2.5 , -player.attackDistance*7.5, 5*player.attackWidth, 5*player.attackDistance);

    ctx.restore();
}

var update = function(modifier)
{
    var currentTime = Date.now();
    //var mod = modifier
    playerMovment(modifier);
    /// verify key presses
    enemyMovement();

    /// enemy movments & actions

}


var tile = new tileSpace(wallImage, 100, 50);
var render = function()
{
    /// drawing images
    ctx.drawImage(background.image, 0,0);
    drawPlayer();
    for (var i = 0; i<listOfObjects.length; i++){
        if (listOfObjects[i].isPickedUp == true){
            drawObject();
             listOfObjects[i].posX = player.posX+8;
            listOfObjects[i].posY = player.posY-10;
            
        }
        else{
            ctx.drawImage(listOfObjects[i].image, listOfObjects[i].posX, listOfObjects[i].posY);
        }
    }
    drawEnemy();
    drawMap();
    if(boolAttack == true){
        attackAnimation();
    }
    
}

var drawEnemy = function(){
        for(var i = 0; i < enemyList.length; i++){
            ctx.drawImage(enemyList[i].image, enemyList[i].posX-10, enemyList[i].posY-10);
        }
    }

var tileList =  [];
var drawMap = function (){
    if(tileList.length < 1){
        for(var i = 0; i < tileSet.length; i++){
            for(var j = 0; j < tileSet[i].length; j++){
                if(tileSet[i][j] == 1){
                    var tile = new tileSpace(wallImage,12.5+ j*25,12.5+ i*25);
                    tileList.push(tile);
                }
            }
        }
    }
    for(var i = 0; i < tileList.length; i++){
        ctx.drawImage(tileList[i].image, tileList[i].posX-12.5, tileList[i].posY-12.5);
    }
}

var drawPlayer = function(){
    ctx.save();
    ctx.translate(player.posX, player.posY);
    ctx.rotate(totalRotation*Math.PI/360);
    ctx.drawImage(player.image, -10, -10);
    ctx.restore();
}
var drawObject = function(){
    ctx.save();
    ctx.translate(player.posX, player.posY);
    ctx.rotate(totalRotation*Math.PI/360);
    ctx.drawImage(objectTest.image, 8, -10);
    ctx.restore();
}
var main = function()
{
   // tileList = [];
    var now = Date.now();
    var delta = now - then;
    
    update(delta / 1000);
    render();
    then = now;

  
    requestAnimationFrame(main);
}




// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
// reset();

main();

var GameOver = function(){
     ctx.drawImage(background.image, 0,0);
     ctx.font = "50px Arial";
     ctx.fillText("Game Over",150,300);
  exit();
}

var x =0;
var y = 0;
var s =0;
var token = 0;
var newEnemy;
var spawnEnemy = function(){
    console.log("here");
    token = Math.random()*10;
    if(token < 5){
        x = Math.random()*50 + 500;
        y = Math.random()*600
    }
    else{
        x =  Math.random()*600;
         y = Math.random()*50 + 500;
    }
    s = Math.random()*10;
    newEnemy = new enemy(enemyImage, x, y, s);
    enemyList.push(newEnemy);
}