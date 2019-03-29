const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let midX = canvas.width / 2;
let midY = canvas.height / 2;

let clock = new Image();
clock.src = "clock.png";

let myClock = new Image();
myClock.src = "ownclock.png"

let seconds = new Image();
seconds.src = "secondsHand.png";
let mySeconds = new Image();
mySeconds.src = "seconds.png"

let minutes = new Image();
minutes.src = "minutesHand.png";
let myMinutes = new Image();
myMinutes.src = "minutes.png"

let hours = new Image();
hours.src = "hoursHand.png";
let myHours = new Image();
myHours.src = "hours.png"



function animate()
{
  myTime = new Date();
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw clock
  //ctx.drawImage(clock, (midX - clock.width / 2), (midY - clock.height / 2));
  ctx.drawImage(myClock, (midX - myClock.width / 2), (midY - myClock.height / 2));

  // draw secondsHand (red)
  ctx.save();
  ctx.translate(midX-5,midY+0);
   // keer 2pi delen door aantal seconden rondje voor radius
  ctx.rotate(myTime.getSeconds() * 2 * Math.PI / 60);
  ctx.drawImage(mySeconds, -351, -351);
  ctx.restore();


  // draw minutesHand (blue)
  ctx.save();
  ctx.translate(midX,midY);
  ctx.rotate(myTime.getMinutes() * 2 * Math.PI / 60);
  ctx.drawImage(myMinutes, -375, -363);
  ctx.restore();



  // // draw hourssHand (green)
  // ctx.save();
  // ctx.translate(midX,midY);
  // ctx.rotate(myTime.getHours()*2*Math.PI/12);
  // ctx.drawImage(hours, -20, -120);
  // ctx.restore();

  // draw hours
  ctx.save();
  ctx.translate(midX,midY);
  ctx.rotate(myTime.getHours()* 2 * Math.PI / 12);
  ctx.drawImage(myHours, -340, -350);
  ctx.restore();

}

animate();
