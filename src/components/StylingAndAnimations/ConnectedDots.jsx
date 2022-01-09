import { useRef, useEffect } from "react";

var stars = [], // Array that contains the stars
FPS = 200, // Frames per second
s = 150, // Number of stars
mouse = {
  x: 0,
  y: 0
};  // mouse location

for (let n = 0; n < s; n++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1 + 1.5,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25
  });
}

function distance( point1, point2 ){
  var xs = 0;
  var ys = 0;
 
  xs = point2.x - point1.x;
  xs = xs * xs;
 
  ys = point2.y - point1.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}
function update() {
  for (let i = 0; i < stars.length; i++) {
    var s = stars[i];
  
    s.x += s.vx / FPS;
    s.y += s.vy / FPS;
    
    if (s.x < 0 || s.x > window.innerWidth) s.vx = -s.vx;
    if (s.y < 0 || s.y > window.innerHeight) s.vy = -s.vy;
  }
}
let ctx;
let canvas;

function ConnectedDots() {
  const canvasRef = useRef(null)

  useEffect(() => {
    canvas = canvasRef.current
    ctx = canvas.getContext('2d')
    function tick() {
      draw();
      update();
      requestAnimationFrame(tick);
    }
    tick()
  }, [])

      function draw() {
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        
        ctx.globalCompositeOperation = "lighter";
        
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i];
        
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.fillStyle = 'black';
          ctx.stroke();
        }
        
        ctx.beginPath();
        for (var y = 0; y < stars.length; y++) {
          var starI = stars[y];
          ctx.moveTo(starI.x,starI.y); 
          if(distance(mouse, starI) < 200) ctx.lineTo(mouse.x, mouse.y);
          for (var j = 0; j < stars.length; j++) {
            var starII = stars[j];
            if(distance(starI, starII) < 150) {
              ctx.lineTo(starII.x,starII.y); 
            }
          }
        }
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = 'white';
        ctx.stroke();
      }
        
      function mouseOver(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }


  return (
    <canvas
        width={window.innerWidth} 
        height={window.innerHeight}
        ref={canvasRef}
        onMouseMove={(e) => mouseOver(e)}
    />
  )
}

export default ConnectedDots;