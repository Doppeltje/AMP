const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let A = new Point(200, 200, 20, "red");
let B = new Point(600, 300, 20, "blue");
let C = new Point(200, 500, 20, "green");
let D = new Point(600, 100, 20, "orange");
let S = new Point(0, 0, 10, "white");

let l = new LinearFunction(1, 1);
let m = new LinearFunction(1, 1);

//referring to Point.js
A.drag(); B.drag(); C.drag(); D.drag();

function animate()
{
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //referring to LinearFunction.js + draw line between A & B
  l.defineLineWithTwoPoints(A, B);
  l.draw(ctx);

  //referring to LinearFunction.js + draw line between C & D
  m.defineLineWithTwoPoints(C, D);
  m.draw(ctx);

  S.x = l.intersection(m).x;
  S.y = l.intersection(m).y;

  A.draw(ctx);
  B.draw(ctx);
  C.draw(ctx);
  D.draw(ctx);
  S.draw(ctx);

  //referring to Point.js
  A.printText("A");
  B.printText("B");
  C.printText("C");
  D.printText("D");
  S.printText("S");
}

animate();
