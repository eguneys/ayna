export function animate(cb: () => void) {

  let last = Date.now();
  
  function step() {
    let now = Date.now();
    let elapsed = now - last;
    last = now;
    cb();
    requestAnimationFrame(step);
  }

  step();  
}
