const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let background = new Image();
background.src = "street.png";

let frontWheel = new Image();
frontWheel.src = "wheel.png";

let backWheel = new Image();
backWheel.src = "wheel.png";


let car = new Image();
car.src = "car.png";

let rot = 0;

let xpos = 0;
let xspeed = 10;

background.addEventListener('load',()=>{
  animate();
})


addEventListener('keydown',(evt)=>{
  switch (evt.key) {
    case "ArrowRight":
      xspeed+= 1;
      break;
      case "ArrowLeft":
      xspeed -=1;
      break;
    default:
  }
})

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);

  ctx.drawImage(car, xpos, 200);

  ctx.save();
  ctx.translate(xpos + 753, 400);
  ctx.rotate(rot);
  ctx.drawImage(frontWheel, -frontWheel.width/2, -frontWheel.height/2);
  ctx.restore();

  ctx.save();
  ctx.translate(xpos + 215, 400);
  ctx.rotate(rot);
  ctx.drawImage(backWheel,-backWheel.width/2,-backWheel.height/2);
  ctx.restore();

  //rot += 0.1;
  rot += xspeed / 50;
  xpos += xspeed;
  if (xpos > canvas.width){
    xpos = -car.width;
  }
}
