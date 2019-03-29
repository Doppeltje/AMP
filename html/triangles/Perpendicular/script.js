//  __1. maak van 3 punten een driehoek
// 2. loodrechte lijn (perpendicular) door punt
// __4. maak van drie punten een driehoek
// __5. maak 3 punten in het midden op de lijnen van de driehoek
//  2. maak 3 lijnen door de hoekpunten loodrecht op de overliggende
//     zijde (altitude)
//3.



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;

let A = new Point(100,100,15,"red");
let B = new Point(800,300,15,"green");
let C = new Point(600,100,15,"blue");

let S = new Point(0,0,10,"white");

let l = new LinearFunction(1,1);
let m = new LinearFunction(1,1);

A.drag();
B.drag();
C.drag();

function animate()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);

  l.letTwoPointsDefineLine(A, B);
  m.slope = -1/l.slope;
  m.intercept = C.y - m.slope*C.x;
  S.x = l.intersection(m).x;
  S.y = l.intersection(m).y;

  l.draw(ctx);
  m.draw(ctx);

  A.draw(ctx);
  B.draw(ctx);
  C.draw(ctx);

  S.draw(ctx);

  A.printText("A");
  B.printText("B");
  C.printText("C");
}

animate();
