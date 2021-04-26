import Rect, { RectDef } from '../play/rect';

export function requal(a: Rect, b: RectDef) {
  let br = Rect.make(b);
  if (br.key !== a.key) {
    console.log('actual ', a.key, '\nexpected ', br.key);
  }
}

export default function test() {

  
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
