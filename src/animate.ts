export function animate(cb: () => void) {

  function step() {
    cb();
    requestAnimationFrame(step);
  }

  step();  
}
