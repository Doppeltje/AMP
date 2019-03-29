const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let rot = 0;
let angle = 0;
let mouse = {};
let line = new LinearFunction(1, 1);

let midX = canvas.width/2;
let midY = canvas.height/2;

function animate()
{
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(90, 23, 36, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(midX, midY)
  angle = Math.atan2((mouse.y - midY), (mouse.x - midX));
  ctx.rotate(angle);
  // draw arrow
  drawArrow();
  ctx.restore();

  ctx.save();
  ctx.translate((midX + 400), midY);
  angle = Math.atan2((mouse.y - midY), (mouse.x - (midX + 400)));
  ctx.rotate(angle);
  drawArrow();
  ctx.restore();

  ctx.save();
  ctx.translate((midX - 400), midY);
  angle = Math.atan2((mouse.y - midY), (mouse.x - (midX - 400)));
  ctx.rotate(angle);
  drawArrow();
  ctx.restore();

  ctx.save();
  ctx.translate((midX - 200), (midY - 200));
  angle = Math.atan2((mouse.y - (midY - 200)), (mouse.x - (midX - 200)));
  ctx.rotate(angle);
  drawArrow();
  ctx.restore();

  ctx.save();
  ctx.translate((midX + 200), (midY + 200));
  angle = Math.atan2((mouse.y - (midY + 200)), (mouse.x - (midX + 200)));
  ctx.rotate(angle);
  drawArrow();
  ctx.restore();
}

animate();

function drawArrow()
{
  let sh = 15;
  let sw = 80;
  let ah = 40;
  let aw = 50;

  ctx.fillStyle = "white";


  ctx.beginPath();
  ctx.moveTo(0, 0);

  ctx.lineTo(0, sh);
  ctx.lineTo(sw, sh);
  ctx.lineTo(sw, ah);
  ctx.lineTo(aw + sw, 0)
  ctx.lineTo(sw,-ah);
  ctx.lineTo(sw,-sh);
  ctx.lineTo(0,-sh);

  ctx.closePath();
  ctx.stroke();
}

addEventListener('mousemove', (evt)=>
{
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});
