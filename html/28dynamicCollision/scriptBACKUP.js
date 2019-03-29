const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let midX = canvas.width/2;
let midY = canvas.height/2;

let numOfBalls = 2;
let gameObj1 = {};
let gameObj2 = {};
let temp;

function setup()
{
  gameObj1.pos = new Vector2d(200, 200);
  gameObj1.vel = new Vector2d(2, 3);
  gameObj1.point = new Point(0, 0, 100, "yellow");
  gameObj1.point.position(gameObj1.pos);
  gameObj1.rad = new Vector2d(1, 1);
  gameObj1.tan = new Vector2d(1, 1);

  gameObj2.pos = new Vector2d(500, 500);
  gameObj2.vel = new Vector2d(3, 2);
  gameObj2.point = new Point(0, 0, 100, "blue");
  gameObj2.point.position(gameObj2.pos);
  gameObj2.rad = new Vector2d(1, 1);
  gameObj2.tan = new Vector2d(1, 1);


  animate();
}

function animate()
{
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // GameObject1 speed.
  gameObj1.pos.add(gameObj1.vel);
  gameObj2.pos.add(gameObj2.vel);

  // Box colliders game object 1.
  if (gameObj1.pos.dx < gameObj1.point.r || gameObj1.pos.dx > canvas.width - gameObj1.point.r){
    gameObj1.vel.dx = -gameObj1.vel.dx;
  }
  if (gameObj1.pos.dy < gameObj1.point.r || gameObj1.pos.dy > canvas.height - gameObj1.point.r){
    gameObj1.vel.dy = -gameObj1.vel.dy;
  }

  // Box colliders game object 2.
  if (gameObj2.pos.dx < gameObj2.point.r || gameObj2.pos.dx > canvas.width - gameObj2.point.r){
    gameObj2.vel.dx = -gameObj2.vel.dx;
  }
  if (gameObj2.pos.dy < gameObj2.point.r || gameObj2.pos.dy > canvas.height - gameObj2.point.r){
    gameObj2.vel.dy = -gameObj2.vel.dy;
  }

  gameObj1.point.position(gameObj1.pos);
  gameObj1.point.draw(ctx);

  gameObj2.point.position(gameObj2.pos);
  gameObj2.point.draw(ctx);

  gameObj1.rad.differenceVector(gameObj1.pos, gameObj2.pos);
  gameObj2.rad.differenceVector(gameObj2.pos, gameObj1.pos);

  gameObj1.vel.draw(ctx, gameObj1.pos.dx, gameObj1.pos.dy, 50, "red");
  gameObj2.vel.draw(ctx, gameObj2.pos.dx, gameObj2.pos.dy, 50, "red");

  if (gameObj1.rad.r < gameObj1.point.r + gameObj2.point.r){
    // Magnitude rad vector = 1.
    gameObj1.rad.r = 1;
    gameObj2.rad.r = 1;

    // Tan perpedicular to rad.
    gameObj1.tan.dx = gameObj1.rad.dy;
    gameObj1.tan.dy = -gameObj1.rad.dx;
    gameObj2.tan.dx = gameObj2.rad.dy;
    gameObj2.tan.dy = -gameObj2.rad.dx;

    gameObj1.rad.r = gameObj1.rad.dot(gameObj1.vel);
    gameObj1.tan.r = gameObj1.tan.dot(gameObj1.vel);
    gameObj2.rad.r = gameObj2.rad.dot(gameObj2.vel);
    gameObj2.tan.r = gameObj2.tan.dot(gameObj2.vel);

    // Exchange rad components.
    temp = gameObj1.rad;
    gameObj1.rad = gameObj2.rad;
    gameObj2.rad = temp;

    // Construct new velocity vector.
    gameObj1.vel.sumVector(gameObj1.rad, gameObj1.tan);
    gameObj2.vel.sumVector(gameObj2.rad, gameObj2.tan);

  }

  //gameObj1.rad.draw(ctx, gameObj1.pos.dx, gameObj1.pos.dy, 1, "blue");
  //gameObj2.rad.draw(ctx, gameObj2.pos.dx, gameObj2.pos.dy, 1, "blue");
  //gameObj1.tan.draw(ctx, gameObj1.pos.dx, gameObj1.pos.dy, 1, "green");
  //gameObj2.tan.draw(ctx, gameObj2.pos.dx, gameObj2.pos.dy, 1, "green");






}

setup();
