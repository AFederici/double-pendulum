 var m1 = 10;
 var m2 = 10;
 var r1 = 100;
 var r2 = 100;
 var x0 = y0 = 0;
 var a1 = Math.PI / 2;
 var a2 = Math.PI / 2;
 var a1_v = 0;
 var a2_v = 0;
 var a1_a = 0;
 var a2_a = 0;
 var x1 = 0;
 var y1 = 0;
 var x2 = 0;
 var y2 = 0;
 var previous_x2 = 0;
 var previous_y2 = 0;
 var counter = 0;
 var g = 1;
 var myVar;
 var canvas = document.getElementById("gc");
 var ctx = canvas.getContext("2d");
 var canvas2 = document.getElementById("gc2"); // everything with lines after comment out to change style
 var ctx2 = canvas2.getContext("2d");  //

 ctx.translate(300,80);
 ctx2.translate(300,80);

function init(){

}

 function info(){
   rounded = a1.toFixed(2);
   rounded2 = a2.toFixed(2);
   document.getElementById("info").innerHTML = "Mass 1: " + m1 + " kg " + "<br />" + "Mass 2: " + m2 + " kg <br />" +  "Radius 1: " + r1 + " m <br />" +  "Radius 2: " + r2 + " m <br />" + "Angle 1: " + rounded + " radians <br />" +  "Angle 2: " + rounded2 + "radians \n" ;
 }
 function setTimer(){
   myVar = setInterval(function(){ draw() }, 15);
 }

 function clearTimer(){
   clearInterval(myVar);
 }
 function varUpdate() {
   x1 = r1 * Math.sin(a1);
   y1 = r1 * Math.cos(a1);
   x2 = x1 + r2 * Math.sin(a2);
   y2 = y1 + r2 * Math.cos(a2);
   numerator1 = -1 * g * (2 * m1 + m2) * Math.sin(a1) - m2 * g * Math.sin(a1 - 2 * a2) - 2*Math.sin(a1 - a2) * m2 * (a2_v * a2_v * r2 + a1_v*a1_v * r1 * Math.cos(a1-a2));
   denominator1 = r1 * (2*m1 + m2 - m2 * Math.cos(2*a1 - 2*a2));
   numerator2 = 2 * Math.sin(a1 - a2) * (a1_v * a1_v * r1 * (m1 + m2) + g * (m1 + m2) * Math.cos(a1) + a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2));
   denominator2 = r2 * (2*m1 + m2 - m2 * Math.cos(2*a1 - 2*a2));
   a1_a = (numerator1) / (denominator1);
   a2_a = (numerator2) / (denominator2)
 }

 function drawLines() {
   ctx.clearRect(-300, -80, 600, 520);
   varUpdate();
   //these included you see the balls on black, without its balls and you see the paths
   //ctx.fillStyle = "rgba(0,0,0,0.1)";
   //ctx.fillRect(-300, -80, 600, 540);
   //ctx.clearRect(-300, -80, 600, 520);v

   ctx.fillStyle = "rgba(255,0,0,.9)";
   ctx.beginPath();
   ctx.lineWidth = (3);
   ctx.moveTo(x0, y0);
   ctx.lineTo(x1,y1);
   ctx.fillStyle = "rgba(255, 0, 0,0.9)";
   ctx.stroke();
   ctx.closePath();

   ctx.beginPath();
   ctx.lineWidth = (3);
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2,y2);
   ctx.fillStyle = "rgba(255,0,0,0.9)";
   ctx.stroke();
   ctx.closePath();
}

function drawBalls(){
   ctx.beginPath();
   ctx.fillStyle = "rgba(255,0,0,0.9)";
   ctx.arc(x1,y1,m1,0,2*Math.PI);
   ctx.fill();
   ctx.stroke();
   ctx.closePath();

   ctx.beginPath();
   ctx.arc(x2,y2,m2,0,2*Math.PI);
   ctx.fillStyle = "rgba(255,0 ,0,0.8)";
   ctx.fill();
   ctx.stroke();
   ctx.closePath();
}

function drawPoint() {
  ctx2.beginPath();
  //ctx2.arc(x2,y2,1,0,2*Math.PI);
  //ctx2.fillStyle = "rgba(255,255 ,0,0.8)";
  ctx2.moveTo(previous_x2, previous_y2);
  ctx2.lineTo(x2,y2);
  //ctx2.fill();
  ctx2.stroke();
  ctx2.closePath();
}

function draw() {
   drawLines();
   drawBalls();
   //if (counter % 2 == 0){ // this can be used for spaced out points
   //  drawPoint();
   //}
   if ( counter > 0 && counter % 2 == 0 ){
     drawPoint();
   }
   previous_x2 = x2;
   previous_y2 = y2;
   a1_v += a1_a;
   a2_v += a2_a;
   a1 += a1_v;
   a2 += a2_v;

   //a1_v *= 0.998; //dampening
   //a2_v *= 0.999;
   //a1 += 1;
   //a2 -= 2;
   counter += 1;
}
