const kar = document.querySelector('.kar');
const speedDisplay = document.getElementById('speed-display');

let x = window.innerWidth / 2 - 100;  // starting position
let y = window.innerHeight / 2 - 50;
let vx = 0;
let vy = 0;
let angle = 0;  // degrees, 0 = pointing right
let speed = 0;

const friction = 0.95;
const acceleration = 0.5;
const rotationSpeed = 3; // degrees per frame

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

// Key tracking
document.addEventListener('keydown', e => { if(keys.hasOwnProperty(e.key)) keys[e.key] = true; });
document.addEventListener('keyup', e => { if(keys.hasOwnProperty(e.key)) keys[e.key] = false; });

// Animation loop
function update() {
  const rad = angle * (Math.PI / 180); // convert angle to radians

  // Rotate car
  if (keys.ArrowLeft) angle -= rotationSpeed;
  if (keys.ArrowRight) angle += rotationSpeed;

  // Move forward/backward along car's angle
  if (keys.ArrowUp) {
    vx += Math.cos(rad) * acceleration;
    vy += Math.sin(rad) * acceleration;
  }
  if (keys.ArrowDown) {
    vx -= Math.cos(rad) * acceleration;
    vy -= Math.sin(rad) * acceleration;
  }

  // Apply friction
  vx *= friction;
  vy *= friction;

  // Update position
  x += vx;
  y += vy;

  // Update speed
  speed = Math.sqrt(vx * vx + vy * vy);
  speedDisplay.textContent = 'Speed: ' + speed.toFixed(2);

  // Keep car in window bounds
  const maxX = window.innerWidth - 200;
  const maxY = window.innerHeight - 100;
  if (x < 0) { x = 0; vx = 0; }
  if (y < 0) { y = 0; vy = 0; }
  if (x > maxX) { x = maxX; vx = 0; }
  if (y > maxY) { y = maxY; vy = 0; }

  // Apply position and rotation
  kar.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

  requestAnimationFrame(update);
}

update();
