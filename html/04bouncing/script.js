const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let kineticObject = {};

function setUp() {
for (var i = 0; i < 5; i++) {
  // kineticObject.point = new Point(200, 300, 30, "#BA3C12");
  kineticObject.point = new Point(randomNumber(canvas.width),randomNumber(canvas.height),
  30, "#" + Math.floor(randomNumber(255*255*255)).toString(16));
  // kineticObject.pos = new Vector2d(500, 100);
  kineticObject.pos = new Vector2d(randomNumber(canvas.width), randomNumber(canvas.height))
    }
  kineticObject.vel = new Vector2d(3, 0);
  kineticObject.acc = new Vector2d(0, 0.5);

  animate();
}

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  kineticObject.vel.add(kineticObject.acc);
  kineticObject.pos.add(kineticObject.vel);
  kineticObject.point.position(kineticObject.pos);
  kineticObject.point.draw(ctx);
  if (kineticObject.pos.dx > canvas.width) {
    kineticObject.vel.dx = - kineticObject.vel.dx;
    kineticObject.pos.dx = canvas.width;
  }
  if (kineticObject.pos.dx < 0) {
    kineticObject.vel.dx = - kineticObject.vel.dx;
    kineticObject.pos.dx = 0;
  }
  if (kineticObject.pos.dy > canvas.height) {
    kineticObject.vel.dy = - kineticObject.vel.dy;
    kineticObject.pos.dy = canvas.height;
  }
  if (kineticObject.pos.dy < 0) {
    kineticObject.vel.dy = - kineticObject.vel.dy;
    kineticObject.pos.dy = 0;
  }
}

// setUp();
function randomNumber(max) {
  return Math.random()*max;
}

function randomBalls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(randomBalls);
  for (let i = 0; i < 8; i++) {
    let myPoint = new Point(randomNumber(canvas.width),randomNumber(canvas.height),
    "#" + Math.floor(randomNumber(255*255*255)).toString(16));
    myPoint.draw();
  }


  function randomNumber(max){
    return Math.random()*max;
  }
}

setUp();
