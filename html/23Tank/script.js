class Tank {
  constructor() {
    this.image = new Image();
    this.image.src = "Tank_sheet.png";
    this.counter = 0;
    this.startFrame = 1;
    this.stopFrame = 8;
    this.pos = new Vector2d(100, 100);
    this.vel = new Vector2d(1, 0);
  }

  move(){
    this.pos.add(this.vel);
    if(this.counter >= this.stopFrame){
      this.counter = this.startFrame;
    }
    this.counter++;
  }

  draw(){
    let sx, sy;
    sx = this.counter % 8 * 32;
    sy = Math.floor(this.counter / 8) * 32;
    ctx.save();
    ctx.translate(this.pos.dx, this.pos.dy);
    ctx.rotate(this.vel.angle + Math.PI/2);
    ctx.drawImage(this.image, sx, sy, 32, 32, -16, -16, 64, 64);
    ctx.restore();
  }
}

class Background {
  constructor() {
    this.image = new Image();
    this.image.src = "Tank_sheet.png";
    this.counter = 0;
    this.spriteWidth = 256 / 8;
    this.spriteHeight = 128 / 4;
    this.startFrame = 0;
    this.stopFrame = 1;
    this.pos = new Vector2d(0, 0);
  }

    draw(){
      let sx, sy;
      sx = this.counter % 8 * 32;
      sy = Math.floor(this.counter / 8) * 32;
      ctx.save();
      if (this.pos.dx < canvas.width){
        ctx.translate(this.pos.dx, this.pos.dy);
        this.pos.dx += this.spriteWidth;
      }
      ctx.drawImage(this.image, sx, sy, 32, 32, -16, -16, 64, 64);
      ctx.restore();
    }
}


const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// Middle of the screen.
let midX = canvas.width / 2;
let midY = canvas.height / 2;

// Tank image.
let tank = new Image();
tank.src = "Tank_sheet.png";
let spriteWidth = 256 / 8;
let spriteHeight = 128 / 4;
let spriteFrame;

// Background.
// let bg = new Image();
// bg.src = "Tank_sheet.png";
// let bgWidth = 256 / 8;
// let bgHeight = 128 / 4;
// let bgFrame;

// Tanks


// Time.
let startTime, currentTime, dt;
let frameRate = 1;
let counter = 0;
let numOfCols = 8;

// Movement.
let speedVector = new Vector2d(1, 0);
let slowVector = new Vector2d(-1, 0);


function setup(){
  // Background.
  bg = new Background();
  bg.draw();
  // Tank.
  greenTank = new Tank();
  startTime = new Date();
  frameRate = 30; // Frames per second.
  animate();
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentTime = new Date();
  dt = (currentTime - startTime)/1000;
  requestAnimationFrame(animate);

  if(dt > 1 / frameRate){
    startTime = new Date();
    greenTank.move();
  }

  greenTank.draw();
}

addEventListener('keydown',(evt)=> {
  switch (evt.key) {
    case "ArrowLeft":
      greenTank.vel.angle -= 0.1;
      break;
    case "ArrowRight":
      greenTank.vel.angle += 0.1;
      break;
    case "ArrowUp":
      greenTank.vel.add(speedVector);
      break;
    case "ArrowDown":
      greenTank.vel.add(slowVector);
      break;
    default:
  }
})

setup();
