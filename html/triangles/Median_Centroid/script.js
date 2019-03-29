// __1. lijn door 2 punten
// 2. loodrechte lijn (perpendicular) door punt
// __3. punt halverwege twee punten
// __4. maak van drie punten een driehoek
// __5. maak 3 punten in het midden op de lijnen van de driehoek
// 6. trek een lijn door de hoeken/tussenpunten (median)
// 7. bepaal het middenpunt van de lijnen (centroid)

//  __1. maak van 3 punten een driehoek
//  2. maak 3 lijnen door de hoekpunten loodrecht op de overliggende
//     zijde (altitude)
//3.



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//create points
let A = new Point(200, 200, 20, "red");
let B = new Point(500, 400, 20, "blue");
let C = new Point(900, 200, 20, "green");

// intersection
let S = new Point(0, 0, 6, "white");


let T = new Point(0, 0, 6, "white");
let U = new Point(0, 0, 6, "white");
let V = new Point(0, 0, 6, "white");

// create lines
// triangle
let k = new LinearFunction(1, 1);
let l = new LinearFunction(1, 1);
let m = new LinearFunction(1, 1);

// middle of two
let t = new LinearFunction(1, 1);
let u = new LinearFunction(1, 1);
let v = new LinearFunction(1, 1);

// corner with middle
let g = new LinearFunction(1, 1);
let h = new LinearFunction(1, 1);
let i = new LinearFunction(1, 1);


function animate()
{
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // referring to Point.js
  A.drag(); B.drag(); C.drag();

  // referring to LinearFunction.js
  k.defineLineWithTwoPoints(A, B);
  l.defineLineWithTwoPoints(B, C);
  m.defineLineWithTwoPoints(A, C);

  g.defineLineWithTwoPoints(A, V);
  h.defineLineWithTwoPoints(C, T);
  i.defineLineWithTwoPoints(B, U);

  //middle of A & B
  T.x = t.MiddleOfTwo(A, B).x;
  T.y = t.MiddleOfTwo(A, B).y;

  // middle of A & C
  U.x = u.MiddleOfTwo(A, C).x;
  U.y = u.MiddleOfTwo(A, C).y;

  // middle of B & C
  V.x = v.MiddleOfTwo(B, C).x;
  V.y = v.MiddleOfTwo(B, C).y;

  //draw line between A & B
  k.draw(ctx);
  //draw line between B & C
  l.draw(ctx);
  //draw line between A & C
  m.draw(ctx);

  // draw lines between
  g.drawLine(ctx);
  h.drawLine(ctx);
  i.drawLine(ctx);

  //draw points
  A.draw(ctx);
  B.draw(ctx);
  C.draw(ctx);

  //referring to intersection in LinearFunction
  //S = m [A & C] + l [B & C]
  S.x = l.intersection(m).x;
  S.y = l.intersection(m).y;


  //draw intersection
  //S = [A & C] + [B & C]
  //S.draw(ctx);

  T.draw(ctx);
  U.draw(ctx);
  V.draw(ctx);

  A.printText("A");
  B.printText("B");
  C.printText("C");

  //S.printText("Intersection A&C + B&C");

  T.printText("T");
  U.printText("U");
  V.printText("V");
}

animate();
