// het inproduct:
// dot product          a . b
// scalair product
// projection product
//
//
//


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Line.
let A, B, S, l, m, player;
let i, j;

// Player.
player = {};
player.pos = new Vector2d(400, 400);
player.point = new Point(player.pos.dx, player.pos.dy, 20, "red");
player.vel = new Vector2d(2, 4);

function setup(){
  A = new Point(200, 200, 10, "yellow");
  B = new Point(600, 700, 10, "yellow");
  S = new Point(0, 0, 8, "lightgreen");

  l = new LinearFunction(0.3, 0.3);
  m = new LinearFunction(0.1, 0.1);

  i = new Vector2d(1, 1);
  j = new Vector2d(1, 1);
  i.r = 1; // length is 1.
  j.r = 1;

  A.drag();
  B.drag();

  animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw.
  l.defineLineWithTwoPoints(A, B);
  l.draw(ctx);
  m.slope = -1 / l.slope;
  m.intercept = player.pos.dy - player.pos.dx * m.slope;
  m.draw(ctx);

  A.draw(ctx);
  B.draw(ctx);

  S.x = l.intersection(m).x;
  S.y = l.intersection(m).y;
  S.draw(ctx);

  player.pos.add(player.vel);
  player.point.x = player.pos.dx;
  player.point.y = player.pos.dy;

  if (player.pos.dx - player.point.r < 0 || player.pos.dx + player.point.r > canvas.width){
    player.vel.dx = -player.vel.dx;
  }
  if (player.pos.dy + player.point.r < 0 || player.pos.dy + player.point.r > canvas.height){
    player.vel.dy = -player.vel.dy;
  }
  player.point.draw(ctx);

  player.vel.draw(ctx, player.pos.dx, player.pos.dy, 10);

  i.dx = 1;
  i.dy = l.slope;
  i.r = 1;
  i.r = i.dot(player.vel);

  j.dx = 1;
  j.dy = m.slope;
  j.r = 1;
  j.r = j.dot(player.vel);

  i.draw(ctx, S.x, S.y, 10);
  j.draw(ctx, S.x, S.y, 10);
}

setup();
