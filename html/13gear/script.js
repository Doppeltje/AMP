const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gear1 = new Image();
gear1.rot = 0;
gear1.src = "gear_icon.png";

let gear2 = new Image();
gear2.rot = 0.32;
gear2.src = "gear_icon.png";

let gear3 = new Image();
gear3.rot = 0.0;
gear3.src = "gear_icon.png";

let spiral1 = new Image();
spiral1.rot = 0.0;
spiral1.src = "fraser-spiral-illusion.png";

let spiral2 = new Image();
spiral2.rot = 0.0;
spiral2.src = "fraser-spiral-illusion2.png";

let arrow1 = new Image();
arrow1.rot = 0.0;
arrow1.src = "arrow_250x200.png";

let arrow2 = new Image();
arrow2.rot = 0.0;
arrow2.src = "arrow_450x200.png";

gear1.addEventListener('load', ()=>
{
  animate();
});

function animate()
{
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

// gear 1
  ctx.save();
  ctx.translate(475, 550);
  ctx.rotate(gear1.rot);
  ctx.drawImage(gear1, -gear1.width/2, -gear1.height/2);
  ctx.restore();
// gear 2
  ctx.save();
  ctx.translate(1000, 550);
  ctx.rotate(gear2.rot);
  ctx.drawImage(gear2, -gear2.width/2, -gear2.height/2);
  ctx.restore();

// gear 3
  ctx.save();
  ctx.translate(1525, 550);
  ctx.rotate(gear3.rot);
  ctx.drawImage(gear3, -gear3.width/2, -gear3.height/2);
  ctx.restore();

// spiral 1
  ctx.save();
  ctx.translate(1000, 550);
  ctx.rotate(spiral1.rot);
  ctx.drawImage(spiral1, -spiral1.width/2, -spiral1.height/2);
  ctx.restore();

// spiral 2
  ctx.save();
  ctx.translate(1000, 550);
  ctx.rotate(spiral2.rot);
  ctx.drawImage(spiral2, -spiral2.width/2, -spiral2.height/2);
  ctx.restore();

// arrow 1
//   ctx.save();
//   ctx.translate(1525, 100);
//   ctx.rotate(arrow1.rot);
//   ctx.drawImage(arrow1, -arrow1.width/2, arrow1.height/2);
//   ctx.restore();
//
// // arrow 2
//   ctx.save();
//   ctx.translate(1050, 250);
//   ctx.rotate(arrow2.rot);
//   ctx.drawImage(arrow2, arrow2.width, arrow2.height);
//   ctx.restore();

  gear1.rot -= 0.03;
  gear2.rot += 0.03;
  gear3.rot -= 0.03;
  spiral1.rot -= 0.003;
  spiral2.rot += 0.001;
  arrow1.rot -= 0.03;
  arrow2.rot -= 0.00;
}
