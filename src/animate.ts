export function animate(update: (dt: number) => void, render: () => void) {

  let last = Date.now();
  let dt = 1 / 60;

  let accumulator = 0.0;
  
  function step() {
    let now = Date.now();
    let elapsed = (now - last) / 1000;
    last = now;
    accumulator += elapsed;
    while (accumulator >= dt) {
      update(dt);
      accumulator -= dt;
    }
    render();
    requestAnimationFrame(step);
  }

  step();  
}
