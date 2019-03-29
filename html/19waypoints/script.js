const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {};
let target = {};
let waypointCounter = 0;
let waypoints = [];
let numOfWaypoints = 10;
let speed = 10;

function setup(){
  player.pos = new Vector2d(200, 200);
  player.point = new Point(player.pos.dx, player.pos.dy, 20, "black");
  player.vel = new Vector2d(0, 0);
  target.pos = new Vector2d(200, 200);
  target.point = new Point(target.pos.dx, target.pos.dy, 10, "red");


  animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(i = 0; i < numOfWaypoints; i++){
    let waypoint = {};
    waypoint.pos = new Vector2d(getRandomNumber(canvas.width), getRandomNumber(canvas.height));
    waypoint.point = new Point(waypoint.pos.dx, waypoint.pos.dy, 10, "white");
    waypoints.push(waypoint);
    waypoints[i].point.draw(ctx);
    waypoints[i].pos.draw(ctx);
  }
  // Target.
  target.pos = new Vector2d(waypoints[waypointCounter].pos.dx, waypoints[waypointCounter].pos.dy);
  target.point = new Point(target.pos.dx, target.pos.dy, 10, "red");

  player.vel.differenceVector(player.pos, target.pos);
  if (player.point.distanceToAnOtherPoint(target.point) < speed){
    waypointCounter = getRandomNumber(numOfWaypoints);
    target.pos = new Vector2d(waypoints[waypointCounter].pos.dx, waypoints[waypointCounter].pos.dy);
    player.vel.differenceVector(player.pos, target.pos);
    if (waypointCounter == numOfWaypoints) waypointCounter = 0;
  }

  player.point.draw(ctx);
  // Movement.
  player.vel.r = speed;
  player.pos.add(player.vel);
  player.point.position(player.pos); // Point movement

  // Player arrow.
  player.vel.draw(ctx, player.pos.dx, player.pos.dy, 10);
}

setup();

function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}
