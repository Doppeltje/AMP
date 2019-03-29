const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let startTime, currentTime, dt;
let frameRate = 10;
let counter = 0;
let numOfCols = 10;

let spriteWidth = 100;
let spriteHeight = 100;

let sx, sy;

function setup()
{
  startTime = new Date();

  animate();
}

function animate()
{
  requestAnimationFrame(animate);

  currentTime = new Date();
  dt = currentTime - startTime;
  if (dt > 1000/frameRate){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startTime = new Date();
    sx = counter % numOfCols * spriteWidth;
    sy = Math.floor(counter / numOfCols) * spriteHeight;
    //console.log(counter, sx);
    ctx.fillRect(sx, sy, spriteWidth, spriteHeight);
    counter++
    if (counter >= 30)
    counter = 0;
  }


}

setup();
