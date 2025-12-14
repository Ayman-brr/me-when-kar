const kar = document.querySelector('.kar');
let x = 0;
let y = 0;

document.addEventListener('keydown', e => {
  const step = 10;
  if(e.key === 'ArrowUp') y -= step;
  if(e.key === 'ArrowDown') y += step;
  if(e.key === 'ArrowLeft') x -= step;
  if(e.key === 'ArrowRight') x += step;

  kar.style.transform = `translate(${x}px, ${y}px)`;
});
