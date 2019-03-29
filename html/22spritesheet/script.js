const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// Middle of the screen.
let midX = canvas.width / 2;
let midY = canvas.height / 2;

// Image.
let image = new Image();
image.src = "trump_run.png";
let spriteWidth = 100;
let spriteHeight = 100;
let spriteFrame = 100;

// Background.
let bg = new Image();
bg.src = "Trump_BG.png";

// Time.
let startTime, currentTime, dt;
let frameRate = 20;
let counter = 0;
let numOfCols = 6;

// Movement.
let xspeed = 0;
let yspeed = 0;
let xpos = 0;
let ypos = 0;
let runSpeed = 15;

image.addEventListener("load",() =>{
  Setup();
})

function Setup()
{
  startTime = new Date();
  animate();
}

function animate()
{
  requestAnimationFrame(animate)
  currentTime = new Date();
  dt = currentTime - startTime;

  if (dt > 1000/frameRate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0);
    startTime = new Date();
    sx = counter % numOfCols * spriteWidth;
    sy = spriteFrame;

    ctx.save();
    ctx.translate(xpos, ypos);
    ctx.drawImage(image, sx, sy, spriteWidth, spriteHeight, midX, midY, spriteWidth*2, spriteHeight*2);
    ctx.restore();

    counter++

    if (counter >= numOfCols){
      counter = 0;
    }

    xpos += xspeed;
    ypos += yspeed;
  }

  addEventListener('keydown', (evt)=> {
    switch (evt.key) {
      case "ArrowLeft":
        xspeed = -runSpeed;
        yspeed = 0;
        spriteFrame = 300;
        break;

      case "ArrowRight":
        xspeed = runSpeed;
        yspeed = 0;
        spriteFrame = 100;
        break;

      case "ArrowUp":
        yspeed = -runSpeed;
        xspeed = 0;
        spriteFrame = 200;
        break;

      case "ArrowDown":
        yspeed = runSpeed;
        xspeed = 0;
        spriteFrame = 0;
        break;

      default:
        xspeed = 0;
        break;
    }
  })

}
