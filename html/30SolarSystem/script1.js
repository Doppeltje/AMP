const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let midX = canvas.width/2;
let midY = canvas.height/2;

let sun = {};
let dAngle = 0.005;
let pivot = new Vector2d(midX, midY);
let rotationRadius = 100;

let gameObjectArray = [];
let mini = [];
let gameObject = {};
let numOfPlanets = 4;
let gameObjectArrayMini = [];
let gameObjectMini = {};
let numOfPlanetsMini = 3;

function Setup(){
  // Create mini planets.
  // for (i = 0; i < numOfPlanetsMini; i++){
  //   gameObjectMini[i] = {};
  //   gameObjectMini[i].pos = new Vector2d(0, 0);
  //   gameObjectMini[i].relPos = new Vector2d(1, 0);
  //   gameObjectMini[i].relPos.r = rotationRadius/4;
  //   gameObjectMini[i].point = new Point(0, 0, 5, "white");
  //   gameObjectMini[i].dAngle = 0.1 + getRandomNumber(0.003);
  //   gameObjectMini[i].draw = function(){
  //     gameObjectMini[i].point.x = gameObjectMini[i].pos.dx;
  //     gameObjectMini[i].point.y = gameObjectMini[i].pos.dy;
  //     gameObjectMini[i].point.draw(ctx);
  //   }
  //   gameObjectArray.push(gameObjectMini[i]);
  // }

  // Create planets.
  for (i = 0; i < numOfPlanets; i++){
    gameObject[i] = {};
    gameObject[i].pos = new Vector2d(0, 0);
    gameObject[i].relPos = new Vector2d(1, 0);
    gameObject[i].relPos.r = (rotationRadius * i) + rotationRadius;
    gameObject[i].point = new Point(0, 0, 20, "orange");
    gameObject[i].dAngle = 0.001 + getRandomNumber(0.005);
    gameObject[i].draw = function(){
      gameObject[i].point.x = gameObject[i].pos.dx;
      gameObject[i].point.y = gameObject[i].pos.dy;
      gameObject[i].point.draw(ctx);
    }
    gameObjectArray.push(gameObject[i]);
  }

  sun.pos = new Vector2d(midX, midY);
  sun.point = new Point(sun.pos.dx, sun.pos.dy, 40, "yellow");

  animate();
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  // Draw lines.
  for (i = 0; i < numOfPlanets; i++){
    let r = gameObjectArray[i].relPos.r;
    ctx.beginPath();
    ctx.arc(midX, midY, r, 0, 2*Math.PI);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.stroke();
    ctx.closePath();
  }

  // Draw the big planets.
  for (i = 0; i < numOfPlanets; i++){
    gameObjectArray[i].relPos.angle += gameObjectArray[i].dAngle;
    gameObjectArray[i].pos.sumVector(gameObjectArray[i].relPos, pivot);
    gameObjectArray[i].draw();
  }

  // Draw small planets.


  // Draw the sun.
  sun.point.draw(ctx);
}

Setup();

function getRandomNumber(max){
  return Math.random() * max;
}
