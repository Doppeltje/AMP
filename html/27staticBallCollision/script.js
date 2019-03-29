const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let midX = canvas.width/2;
let midY = canvas.height/2;

let A;
let player;
let l, m;
let i, j;

// Static balls.
let statics = [];
let numOfBalls = 50;
let startPosX = 0;
let startPosY = 0;
let ballSpacing = 200;

function setup()
{
  player = {};
  player.pos = new Vector2d(100, 100);
  player.vel = new Vector2d(2, 3);
  player.point = new Point(player.pos.dx, player.pos.dy, 20, "red");

  // Static ball.
  A = new Point(midX, midY, 200, "green");

  // Lines.
  l = new LinearFunction(1, 0);
  m = new LinearFunction(1, 0);

  // Vectors.
  i = new Vector2d(1, 1);
  j = new Vector2d(1, 1);

  for (let i = 0; i < numOfBalls; i++)
  {
    let staticBall = {};
    staticBall.pos = new Vector2d(startPosX, startPosY);
    staticBall.color = "red";
    staticBall.point = new Point(staticBall.pos.dx + ballSpacing * i,
                                staticBall.pos.dy + ballSpacing * i
                                , 10, staticBall.color);
    statics.push(staticBall);
  }

  animate();
}

function animate()
{
  requestAnimationFrame(animate);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numOfBalls; i++)
  {
    statics[i].point.draw(ctx);
  }

  A.draw(ctx);

  if (player.pos.dx < player.point.r || player.pos.dx > canvas.width - player.point.r){
    player.vel.dx = -player.vel.dx;
  }

  if(player.pos.dy < player.point.r || player.pos.dy > canvas.height - player.point.r){
    player.vel.dy = -player.vel.dy;
  }

  j.dx = A.x - player.point.x;
  j.dy = A.y - player.point.y;

  i.dx = -j.dy;
  i.dy = j.dx;
  i.r = 1;
  j.r = 1;

  j.r = player.vel.dot(j);
  i.r = player.vel.dot(i);

  if (A.distanceToAnOtherPoint(player.point) < A.r + player.point.r){
    j.angle += Math.PI;
    player.vel.sumVector(i, j);
  }

  // Lines.
  l.defineLineWithTwoPoints(A, player.point);
  l.draw(ctx);

  m.draw(ctx);
  m.slope = -1 / l.slope;
  m.intercept = player.point.y - m.slope * player.point.x;

  // Adds velocity to position.
  player.pos.add(player.vel);
  player.point.position(player.pos);
  player.point.draw(ctx);

  // Draw vector.
  player.vel.draw(ctx, player.pos.dx, player.pos.dy, 25); // Draw direction of player.
  j.draw(ctx, player.pos.dx, player.pos.dy, 40);
  i.draw(ctx, player.pos.dx, player.pos.dy, 40);

}

setup();
