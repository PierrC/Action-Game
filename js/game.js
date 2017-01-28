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


var char = function(image, posX, posY, facing, speed, hasObject, attackDistance, attackWidth){

    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.facing = facing;
    this.speed = speed;
    this.hasObject = hasObject;
    this.attackDistance = attackDistance;
    this.attackWidth = attackWidth;

}
var object = function(image, posX, posY, attackDistanceIncrease, attackWidthIncrease){

    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.attackDistanceIncrease = attackDistanceIncrease;
    this.attackWidthIncrease = attackWidthIncrease;

}


//////////////////////////////////////////////////////
/////               Images                        ////
//////////////////////////////////////////////////////
var backgroundImage = new Image();
backgroundImage.src = "img/whiteBackground.png"
var background = new object(backgroundImage,0,0,0,0);

var objectImage = new Image();
objectImage.src = "img/objectPlaceHolder.png";
var objectTest = new object(objectImage, 50, 50, 0, 0);

var playerImage = new Image();
playerImage.src = "img/charPlaceHolder.png";
var player = new char(playerImage, 100, 100, 0, 12, 0, 0, 0);


var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	e.preventDefault();
}, false);

addEventListener("keyup", function (e) {
	keysDown[e.keyCode] = false;
}, false);


var totalPosX = 0;
var totalPosY = 0;
var totalRotation = 0;
var playerMovment = function(modifier)
{

///////// Position movment /////////////////////

    if (keysDown[65] == true) { // Player holding left
        console.log("left");
        totalPosX =(-1)*(player.speed * modifier * player.speed);
        if(player.posX <= 0){
            player.posX = 0;
        } 
	}
    if (keysDown[68] == true) { // Player holding right
        console.log("right");
		totalPosX = player.speed * modifier * player.speed;
        if(player.posX >= 575){
            player.posX= 575;
        } 
	}
    player.posX += totalPosX;
    totalPosX = totalPosX * 0.9;

	if (keysDown[87] == true) { // Player holding up
        console.log("up");
		totalPosY =(-1)*(player.speed * modifier * player.speed);
        if(player.posY <= 0){
            player.posY = 0;
        }
	}
	if (keysDown[83] == true) { // Player holding down
        console.log("down");
		totalPosY =(player.speed * modifier * player.speed);
        if(player.posY >= 575){
            player.posY = 575;
        }
	}
    player.posY += totalPosY;
    totalPosY = totalPosY * 0.9;


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
    
}


var update = function(modifier)
{
    var currentTime = Date.now();
    //var mod = modifier
    playerMovment(modifier);
    /// verify key presses


    /// enemy movments & actions

}

var render = function()
{
    
    /// drawing images
    ctx.drawImage(background.image, 0,0);
    ctx.drawImage(objectTest.image, objectTest.posX-5, objectTest.posY-5);
    drawPlayer();
    
}

function drawPlayer(){
    ctx.save();
    ctx.translate(player.posX, player.posY);
    ctx.rotate(totalRotation*Math.PI/360);
    ctx.drawImage(player.image, -10, -10);
    ctx.restore();
}

var main = function()
{
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



