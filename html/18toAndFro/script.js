const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {};
let A = {};
let B = {};
let goToA = false;
let speed = 5;


function setup(){
  player.pos = new Vector2d(200,200);
  player.point = new Point(player.pos.dx,player.pos.dy,20,"yellow");
  player.vel = new Vector2d(0,0)

  A.pos = new Vector2d(200,500);
  A.point = new Point(A.pos.dx,A.pos.dy,20,"white");

  B.pos = new Vector2d(800,200);
  B.point = new Point(B.pos.dx,B.pos.dy,20,"white");


  animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(goToA){
    player.vel.differenceVector(player.pos,A.pos);
    if(player.point.distanceToAnOtherPoint(A.point)<speed){
      goToA = false;
    }
  } else {
    player.vel.differenceVector(player.pos,B.pos);
    if(player.point.distanceToAnOtherPoint(B.point)<speed){
      goToA = true;
    }
  }

  A.point.draw(ctx);
  B.point.draw(ctx);
  B.pos.draw(ctx,0,0,1);
  player.point.draw(ctx);
  player.pos.draw(ctx,0,0,1);
  player.vel.r = speed;
  player.pos.add(player.vel);
  player.point.position(player.pos);


  player.vel.draw(ctx,player.pos.dx,player.pos.dy,20);
}

setup();
