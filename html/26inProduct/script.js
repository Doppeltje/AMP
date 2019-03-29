const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let midX = canvas.width/2;
let midY = canvas.height/2;

let A, B, C;
let vector;
let a, b;
let l, m;


function setup(){

  A = new Point(100, 100, 10, "blue");
  B = new Point(400, 300, 10, "red");
  C = new Point(50, 20, 10, "yellow");
  A.drag();
  B.drag();
  C.drag();
  vector = new Vector2d(B.x - A.x, B.y - A.y);
  l = new LinearFunction(1, 1);
  m = new LinearFunction(1, 1);

  a = new Vector2d(C.x - A.x, C.y - A.y);
  b = new Vector2d(a.dy, -a.dx);

  animate();
}

function animate(){
  requestAnimationFrame(animate);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  vector.dx = B.x - A.x;
  vector.dy = B.y - A.y;
  a.dx = C.x - A.x;
  a.dy = C.y - A.y;
  b.dx = -a.dy;
  b.dy = a.dx;

  l.defineLineWithTwoPoints(A, C);
  m.slope = -1 / l.slope;
  m.intercept = A.y - m.slope * A.x

  // Draw vector.
  vector.draw(ctx, A.x, A.y, 1);

  // Length of vectors to 1.
  a.r = 1;
  b.r = 1;

  // Length of a = VECTOR.dot(a)
  a.r = vector.dot(a);
  b.r = vector.dot(b);

  a.draw(ctx, A.x, A.y, 1);
  b.draw(ctx, A.x, A.y, 1);

  // Draw lines.
  l.draw(ctx);
  m.draw(ctx);

  // Draw points.
  A.draw(ctx);
  B.draw(ctx);
  C.draw(ctx);
}

setup();
