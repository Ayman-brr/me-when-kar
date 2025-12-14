const kar = document.querySelector('.kar');
const speedDisplay = document.getElementById('speed-display');

let x = window.innerWidth/3 - 100; 
let y = window.innerHeight/2 - 50;
let vx = 0
let vy = 0; 
let friction = 0.95; // friction factor from physics chapter 3 🙏🏻
let speed = 0; 

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};


document.addEventListener('keydown', e => { if(keys.hasOwnProperty(e.key)) keys[e.key]=true; });
document.addEventListener('keyup', e => { if(keys.hasOwnProperty(e.key)) keys[e.key]=false; });


function update() {
  const acceleration = 0.5;

  
  if(keys.ArrowUp) vy -= acceleration;
  if(keys.ArrowDown) vy += acceleration;
  if(keys.ArrowLeft) vx -= acceleration;
  if(keys.ArrowRight) vx += acceleration;

 
  vx *= friction;
  vy *= friction;

  
  x += vx;
  y += vy;

 
  speed = Math.sqrt(vx*vx + vy*vy);
  speedDisplay.textContent = 'Speed: ' + Math.round(speed.toFixed(2));

  //how tf am i supposed to find the lower values
  const maxX = window.innerWidth - 200;
  const maxY = window.innerHeight - 100;
  if(x < 0) { x=0; vx=0; }
  if(y < 0) { y=0; vy=0; }
  if(x > maxX) { x=maxX; vx=0; }
  if(y > maxY) { y=maxY; vy=0; }

  
  kar.style.transform = `translate(${x}px, ${y}px)`;

  requestAnimationFrame(update);
}

update();
