const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let waypointCounter = 0;
let players = [];
let waypoints = [];
let numOfPlayers = 7;
let numOfWaypoints = 30;
let speed = 5;
let playerColors = ["red", "blue", "green", "yellow", "cyan", "orange", "magenta"];
// Spawn offset
let spawnOffset = 200;

// Scoreboard
let offset = 25;

function setup(){
  // Create players.
  for(i = 0; i < numOfPlayers; i++){
    let player = {};
    player.pos = new Vector2d(getRandomNumber(canvas.width) + spawnOffset, getRandomNumber(canvas.height));
    player.point = new Point(player.pos.dx, player.pos.dy, 20, playerColors[i]);
    player.vel = new Vector2d(0, 0);
    player.targetPos = new Vector2d(getRandomNumber(canvas.width), canvas.height/2);
    player.targetPoint = new Point(player.targetPos.dx, player.targetPos.dy, 0, "white");
    player.score = 0;
    player.fontStyle = playerColors[i];
    players.push(player);
    players[i].point.draw(ctx);
    players[i].pos.draw(ctx);
  }

  // Create waypoints.
  for(i = 0; i < numOfWaypoints; i++){
    let waypoint = {};
    waypoint.pos = new Vector2d(getRandomNumber(canvas.width) + spawnOffset, getRandomNumber(canvas.height));
    waypoint.point = new Point(waypoint.pos.dx, waypoint.pos.dy, 2, "white");
    waypoints.push(waypoint);
  }

  // Create targets.
  // for(i - 0; i < numOfPlayers; i++){
  //   players[i].targetPos = new Vector2d(waypoints[waypointCounter].pos.dx, waypoints[waypointCounter].pos.dy);
  //   players[i].targetPoint = new Point(target.pos.dx, target.pos.dy, 10, "white");
  // }

  animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw waypoints.
  for (i = 0; i < numOfWaypoints; i++){
    waypoints[i].point.draw(ctx);
    waypoints[i].pos.draw(ctx);
 }

  // Move player towards target.
  for(i = 0; i < numOfPlayers; i++){
    players[i].point.draw(ctx);
    players[i].vel.r = speed;
    players[i].pos.add(players[i].vel);
    players[i].point.position(players[i].pos);
    players[i].vel.differenceVector(players[i].pos, players[i].targetPos);
  }

  // If target is reached, change target.
  for(i = 0; i < numOfPlayers; i++){
    if (players[i].point.distanceToAnOtherPoint(players[i].targetPoint) < speed){
      waypointCounter = getRandomNumber(numOfWaypoints);
      players[i].score++;
      players[i].targetPos = new Vector2d(waypoints[waypointCounter].pos.dx, waypoints[waypointCounter].pos.dy);
      players[i].targetPoint = new Point(waypoints[waypointCounter].pos.dx, waypoints[waypointCounter].pos.dy);
      players[i].vel.differenceVector(players[i].pos, players[i].targetPos);
      players[i].point.draw(ctx);
      // Movement.
      players[i].vel.r = speed;
      players[i].pos.add(players[i].vel);
      players[i].point.position(players[i].pos);
    }
    // Player arrow.
    players[i].vel.draw(ctx, players[i].pos.dx, players[i].pos.dy, 1, players[i].point.color);
  }

  // Scoreboard.
  ctx.fillStyle = "black";
  ctx.font = "22px Courier New";
  ctx.fillText("Scoreboard", 10, 20);
  for(i = 0; i < numOfPlayers; i++){
    ctx.fillStyle = players[i].fontStyle;
    ctx.fillText("Player: " + players[i].score, 10, 40 + offset * i);
  }


}

setup();

function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}
