const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];

for (var i = 0; i < 6; i++) {
  addPoint();
}

function animate() {
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);
  if(Math.random() < 0.04) {
    dots.splice(0,1)
    addPoint();
  }
// context.fillStyle = "rgba(255,255,0,0.2)"
context.fillStyle = "rgba(230,0,0,0.2)";
  context.beginPath();
  context.moveTo(dots[0].x,dots[0].y);
  for (var i = 0; i < dots.length; i++) {
    context.lineWidth = 1;
    context.lineTo(dots[i].x,dots[i].y);
  }
  context.closePath();
  context.fill();
  context.stroke();
  for (var i = 0; i < dots.length; i++) {
    dots[i].draw();
    dots[i].printText(i);
  }
}

animate();

function randomNumber(max) {
  return Math.random()*max;
}


// moveTo(x,y)
// lineTo(x,y)
// stroke()

function addPoint() {
  let dot = new Point(randomNumber(canvas.width),randomNumber(canvas.height),
  "#" + Math.floor(randomNumber(255*255*255)).toString(16));
  dots.push(dot);
}
