const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let midX = canvas.width/2;
let midY = canvas.height/2;

let numOfBalls = 5;
let movingBalls = [];
let gameObj1 = {};
let gameObj2 = {};
let temp;
let baseSpawn = 200;
let spawnX = 300;
let spawnY = 200;

function setup()
{
  for (n = 0; n < numOfBalls; n++)
  {
    let movingBall = {};
    movingBall.pos = new Vector2d(baseSpawn + spawnX * n, spawnY);
    movingBall.vel = new Vector2d(2, 3);
    movingBall.point = new Point(0, 0, 30, "yellow");
    movingBall.point.position(movingBall.pos);
    movingBall.rad = new Vector2d(1, 1);
    movingBall.tan = new Vector2d(1, 1);
    movingBall.id = n;

    movingBalls.push(movingBall);
  }

  animate();
}

function animate()
{
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add speed.
  for (n = 0; n < numOfBalls; n++)
  {
    movingBalls[n].pos.add(movingBalls[n].vel);
  }

  // Edge Colliders.
  for (n = 0; n < numOfBalls; n++){
    if (movingBalls[n].pos.dx < movingBalls[n].point.r ||
        movingBalls[n].pos.dx > canvas.width - movingBalls[n].point.r){
          movingBalls[n].vel.dx *= -1;
    }
    if (movingBalls[n].pos.dy < movingBalls[n].point.r ||
    movingBalls[n].pos.dy > canvas.height - movingBalls[n].point.r){
      movingBalls[n].vel.dy *= -1;
    }
  }

  // Draw balls.
  for (n = 0; n < numOfBalls; n++){
    movingBalls[n].point.position(movingBalls[n].pos);
    movingBalls[n].point.draw(ctx);
    movingBalls[n].pos.draw(ctx);
    movingBalls[n].vel.draw(ctx, movingBalls[n].pos.dx, movingBalls[n].pos.dy, 15, "red");
  }

  // // Check other ball colliders.
   for (n = 0; n < numOfBalls; n++){
     for (o = 0; o < numOfBalls; o++){
       if (o !== n){
        movingBalls[o].rad.differenceVector(movingBalls[o].pos, movingBalls[n].pos);
         if (movingBalls[n].rad.r < movingBalls[n].point.r + movingBalls[o].point.r){
          console.log("test1");
          SetNewVector(movingBalls[o], movingBalls[n]);
        }
      }
    }
  }
}

setup();


function SetNewVector(a, b){
  // Magnitude rad vector = 1.
  a.rad.r = 1;
  b.rad.r = 1;

  // Tan perpedicular to rad.
  a.tan.dx = a.rad.dy;
  a.tan.dy = -a.rad.dx;
  b.tan.dx = b.rad.dy;
  b.tan.dy = -b.rad.dx;

  a.rad.r = a.rad.dot(a.vel);
  a.tan.r = a.tan.dot(a.vel);
  b.rad.r = b.rad.dot(b.vel);
  b.tan.r = b.tan.dot(b.vel);

  // Exchange rad components.
  temp = a.rad;
  a.rad = b.rad;
  b.rad = temp;

  // Construct new velocity vector.
  a.vel.sumVector(a.rad, a.tan);
  b.vel.sumVector(b.rad, b.tan);
}
