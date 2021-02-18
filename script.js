"use strict"

var music = document.getElementById("music")
var canvas = document.getElementById("tela")
canvas.addEventListener("click",onClick)
var ctx = canvas.getContext("2d")

const car ={
    width : 30,
    height : 15,
    xPosition : 500,
    yPosition : 100,
    velocity : 0,
    displayVelocity: 0,
    forceFoward : 0,
    forceBackward : 0,
    facingAngle : 0,
    isOnRoad: true,
    isReversing : false
}

const road={
    xPosition: 0,
    yPosition:0,
    width:0,
    heigh:0
}

const baseForce = 0.06
const baseTurningSpeed = 4
const baseRoadAttrition = 0.99
const baseDirtAttrition = 0.94

const maxSpeedFront = 7.5
const maxSpeedBack = -3
const maxTurnSpeed = 3

const debugMode = false
var isInitialized = false
var musicOn = true;

var keyArray = []

var rocksOnGround = 200

var roadArray= []
var turnArray= []


requestAnimationFrame(draw)

function draw(){
    musicControl()
    processKeys()
    checkCollision()
    moveCar()
    
    ctx.clearRect(0,0,canvas.clientWidth, canvas.height)
    ctx.clientWidth = 2
    
    drawRoads()

    var xView = car.xPosition + car.width / 2;
    var yView = car.yPosition + car.height / 2;
    ctx.save()
    ctx.translate(xView,yView)
    ctx.rotate(car.facingAngle * Math.PI / 180)

    drawCar()
    ctx.restore();
    
    ctx.font = "30px Arial"
    ctx.fillText(car.displayVelocity+" km/h", 30, 650);
    requestAnimationFrame(draw)
    
}

function checkCollision(){
    var i

    for(i=0; i<roadArray.length; i++){      //roadArray e turnArray devem possuir mesmo numero de integrantes
        car.isOnRoad = RectsColliding(turnArray[i].x, turnArray[i].y, 60, 60) 

        if(car.isOnRoad){
            return
        } 
    }

    for(i=0; i<turnArray.length; i++){    
        car.isOnRoad = RectsColliding(roadArray[i].x-8, roadArray[i].y-8, roadArray[i].w+15, roadArray[i].h+15);
        if(car.isOnRoad){
            return
        } 
    }
}


function RectsColliding(x,y,w,h){  
    return !(car.xPosition>x+w || car.xPosition+car.width+5<x || car.yPosition>y+h || car.yPosition+car.height+10<y);
}

function drawRoads(){
    if(roadArray<7){
        roadArray.push({x:240, y:85, w:560, h:60})      //estrada 0
        roadArray.push({x:800, y:145, w:60, h:150})     //estrada 1 
        roadArray.push({x:860, y:295, w:150, h:60})     //estrada 2
        roadArray.push({x:1010, y:355, w:60, h:200})     //estrada 3
        roadArray.push({x:400, y:555, w:610, h:60})     //estrada 4
        roadArray.push({x:340, y:455, w:60, h:100})     //estrada 5
        roadArray.push({x:240, y:395, w:100, h:60})     //estrada 6
        roadArray.push({x:180, y:145, w:60, h:250})     //estrada 7
    }

    if(turnArray<7){
        turnArray.push({x:roadArray[1].x, y:roadArray[0].y})    //curva 0
        turnArray.push({x:roadArray[1].x, y:roadArray[2].y})    //curva 1
        turnArray.push({x:roadArray[3].x, y:roadArray[2].y})    //curva 2
        turnArray.push({x:roadArray[3].x, y:roadArray[4].y})    //curva 3
        turnArray.push({x:roadArray[5].x, y:roadArray[4].y})    //curva 4
        turnArray.push({x:roadArray[5].x, y:roadArray[6].y})    //curva 5
        turnArray.push({x:roadArray[7].x, y:roadArray[6].y})    //curva 6
        turnArray.push({x:roadArray[7].x, y:roadArray[0].y})    //curva 7
    }

    

    var i  
    for(i=0; i<roadArray.length; i++){  //road hitbox
            ctx.fillStyle = "rgb(255, 255, 153)"  
            ctx.fillRect(turnArray[i].x, turnArray[i].y, 60, 60)
            ctx.fillRect(roadArray[i].x-8, roadArray[i].y-8, roadArray[i].w+15, roadArray[i].h+15)
    }
    for(i=0; i<roadArray.length; i++){      //draw all roads 

        ctx.fillStyle = "rgb(0, 0, 0)"
        ctx.fillRect(roadArray[i].x, roadArray[i].y, roadArray[i].w, roadArray[i].h) 
    }

    //eita. Devia automatizar isso
    ctx.beginPath();    
    ctx.moveTo(turnArray[0].x,turnArray[0].y)   //curva 0
    ctx.lineTo(roadArray[2].x, roadArray[1].y)
    ctx.lineTo(roadArray[1].x, roadArray[1].y)
    ctx.fill();

    ctx.beginPath();    
    ctx.moveTo(turnArray[1].x, turnArray[1].y)  //curva 1
    ctx.lineTo(roadArray[2].x, roadArray[2].y)
    ctx.lineTo(roadArray[2].x, roadArray[3].y)
    ctx.fill();

    ctx.beginPath();    
    ctx.moveTo(turnArray[2].x, turnArray[2].y)  //curva 2
    ctx.lineTo(roadArray[3].x, roadArray[3].y)
    ctx.lineTo(roadArray[3].x+60, roadArray[3].y)
    ctx.fill();

    ctx.beginPath();    
    ctx.moveTo(roadArray[3].x+60, roadArray[4].y)
    ctx.lineTo(turnArray[3].x, turnArray[3].y)  //curva 3
    ctx.lineTo(roadArray[3].x, roadArray[4].y+60)
    ctx.fill();

    ctx.beginPath();    
    ctx.moveTo(roadArray[4].x, roadArray[4].y+60)
    ctx.lineTo(roadArray[4].x, roadArray[4].y)
    ctx.lineTo(turnArray[4].x, turnArray[4].y)  //curva 4
    ctx.fill();

    ctx.beginPath();    
    ctx.moveTo(roadArray[4].x, roadArray[5].y)
    ctx.lineTo(roadArray[5].x, roadArray[5].y)
    ctx.lineTo(turnArray[5].x, roadArray[6].y)  //curva 5
    ctx.fill();

    ctx.beginPath();    
    ctx.moveTo(roadArray[6].x, roadArray[5].y)
    ctx.lineTo(roadArray[6].x, roadArray[6].y)
    ctx.lineTo(roadArray[7].x, roadArray[6].y)  //curva 6
    ctx.fill();

    ctx.beginPath();    //curva 7
    ctx.moveTo(roadArray[7].x, roadArray[7].y)
    ctx.lineTo(roadArray[0].x, roadArray[7].y)
    ctx.lineTo(roadArray[0].x, roadArray[0].y)
    ctx.fill();

    ctx.fillStyle = "rgb(0, 204, 0)"
    ctx.fillRect(550, 65, 10, 100)  //linha de chegada
}

function drawCar(){     //esse codigo precisa de rework
    if(debugMode){
        ctx.strokeStyle = "rgb(255, 0, 0)"
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(40,0)    //angulo
        ctx.stroke()
    }

    //corpo
    ctx.fillStyle = "rgb(204, 204, 204)"
    ctx.fillRect(-car.width/2, -car.height/2, car.width ,car.height)    //chassi
    
    ctx.fillStyle = "rgb(140, 140, 140)"
    ctx.fillRect(car.width/4.5, -car.height/2.6, car.height/1.8, car.height/1.3)    //capo
    ctx.fillRect(car.width/8, -car.height/1.5, car.width/20, car.width/10) //retrovisor
    ctx.fillRect(car.width/8, car.height/2.1, car.width/20, car.width/10) //retrovisor

    //vidro 
    ctx.fillStyle = "rgb(0, 0, 0)"
    ctx.fillRect(-car.width/18, -car.height/3.5, car.height/1.8, car.height/1.7) //painel
    ctx.fillRect(-car.width/2.5, -car.height/3.6, car.height/5, car.height/1.7) //traseiro
    ctx.fillRect(-car.width/6, -car.height/2.2, car.width/4, car.height/10) //janelas
    ctx.fillRect(-car.width/6, car.height/2.8, car.width/4, car.height/10)  //janelas
    ctx.fillRect(-car.width/3, -car.height/2.2, car.width/8, car.height/10) //janelas
    ctx.fillRect(-car.width/3, car.height/2.8, car.width/8, car.height/10)  //janelas

    //farrois
    ctx.fillStyle = "rgb(255, 255, 0)"
    ctx.fillRect(car.width/2.15, -car.height/2, car.width/30, car.width/20) //amarelo dianteiro
    ctx.fillRect(car.width/2.15, car.height/2.5, car.width/30, car.width/20) //amarelo dianteiro
    ctx.fillRect(-car.width/2, -car.height/2, car.width/30, car.width/20)   //amarelo traseiro
    ctx.fillRect(-car.width/2, car.height/2.5, car.width/30, car.width/20)  //amarelo traseiro
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.fillRect(car.width/2.3, -car.height/2.6, car.width/15, car.width/10)    //branco dianteiro
    ctx.fillRect(car.width/2.3, car.height/5.5, car.width/15, car.width/10)     // branco dianteiro
    ctx.fillStyle = "rgb(255, 0, 0)"
    ctx.fillRect(-car.width/2, -car.height/2.6, car.width/30, car.width/10)   //vermelho traseiro
    ctx.fillRect(-car.width/2, car.height/5.6, car.width/30, car.width/10)  //vermelho traseiro
}

function moveCar(){
    if(car.velocity != 0){
        if(car.isOnRoad){
            car.forceFoward *= baseRoadAttrition
            car.forceBackward *= baseRoadAttrition
        }
        else{
            car.forceFoward *= baseDirtAttrition
            car.forceBackward *= baseDirtAttrition
        }
    }

    car.velocity = (car.forceFoward - car.forceBackward).toFixed(3)
    car.xPosition += car.velocity * Math.cos(car.facingAngle * Math.PI / 180);
    car.yPosition += car.velocity * Math.sin(car.facingAngle * Math.PI / 180);
    car.displayVelocity = Math.abs(Math.round(car.velocity*15))
}

function processKeys(){
    if(keyArray["ArrowRight"]){
        if(car.velocity != 0){
            car.facingAngle += baseTurningSpeed
           
        }
    }
        
    if(keyArray["ArrowLeft"]){
        if(car.velocity != 0){
            car.facingAngle -= baseTurningSpeed
            music.muted = false;
        }
    }

    if(keyArray["ArrowUp"]){
        if(car.velocity < maxSpeedFront){
            car.forceFoward += baseForce
            music.muted = false;
        }
    }
    if(keyArray["ArrowDown"]){
        if(car.velocity > maxSpeedBack){
            car.forceBackward += baseForce
            music.muted = false;
        }
    }
}

function musicControl(){
    if(!music.muted){
        if(musicOn){
            music.play()
        }
        else{
            music.pause()
        }
    }
}

function onClick(){
    music.muted = false;
}

document.onclick = function(evt){
    music.muted = false;
}
document.onkeydown = function(evt){
    keyArray[evt.key] = true
    music.muted = false;
}

document.onkeyup = function (evt) {
    keyArray[evt.key] = false;
}

