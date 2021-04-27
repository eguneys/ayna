import Rect, { RectDef } from '../play/rect';

export function requal(a: Rect, b: RectDef) {
  let br = Rect.make(b);
  if (br.key !== a.key) {
    console.log('actual ', a.key, '\nexpected ', br.key);
  }
}

export default function() {
  expand();
}

export function expand() {
  let r = Rect.make({
    x: 0, y: 0, w: 10, h: 10
  });

  requal(r.expandM(2, 2), {
    x: -5,
    y: -5,
    w: 20,
    h: 20
  })

  requal(r.expandM(1, 1), {
    x: 0, y: 0, w: 10, h: 10
  });

  requal(r.expandM(0, 0), {
    x: 5, y: 5, w: 0, h: 0
  });  
}

export function lock() {

  
  let lock = Rect.make({
    x: 200,
    y: 0,
    w: 200,
    h: 200
  });

  let righter = Rect.make({
    x: 310,
    y: 0,
    w: 100,
    h: 100
  });

  requal(righter.lock(lock), {
    x: 300,
    y: 0,
    w: 100,
    h: 100
  });

  let middle = Rect.make({
    x: 200,
    y: 0,
    w: 100,
    h: 100
  });

  requal(middle.lock(lock), {
    x: 200,
    y: 0,
    w: 100,
    h: 100
  });

  let lefter = Rect.make({
    x: 0,
    y: 0,
    w: 100,
    h: 100
  });

  requal(lefter.lock(lock), {
    x: 200,
    y: 0,
    w: 100,
    h: 100
  });
  
}
