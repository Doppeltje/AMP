const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let midX = canvas.width/2;
let midY = canvas.height/2;


let earth = {};
let moon = {};
let distanceEarthMoon = 1;

function setup(){
  earth.pos = new Vector2d(midX, midY);
  earth.point = new Point(earth.pos.dx, earth.pos.dy, 50, "blue");

  moon.pos = new Vector2d(200, 200);
  moon.vel = new Vector2d(2, -2);
  moon.acc = new Vector2d(0, 0);
  moon.point = new Point(moon.pos.dx, moon.pos.dy, 5, "white");
  animate();
}

function animate()
{
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Distance earth to moon.
  distanceEarthMoon = earth.point.distanceToAnOtherPoint(moon.point);
  moon.acc.differenceVector(moon.pos, earth.pos);
  moon.acc.r = 10000 / (distanceEarthMoon * distanceEarthMoon);

  // Draw earth.
  earth.point.draw(ctx);

  // Draw moon.
  moon.vel.add(moon.acc);
  moon.pos.add(moon.vel);
  moon.point.position(moon.pos);
  moon.point.draw(ctx);

  //moon.acc.draw(ctx, moon.pos.dx, moon.pos.dy, 1, "red");
}

setup();



function getRandomColor(){
  return Math.random()*255, Math.random()*255, Math.random()*255;
}

function getRandomNumber(max){
  return Math.random() * max;
}
