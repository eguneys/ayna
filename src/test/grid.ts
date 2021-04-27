import Rect from '../play/rect';
import Grid from '../play/grid';

export function log(msg: string, a: boolean, e: boolean) {
  if (a !== e) {
    console.log(msg, 'actual', a, 'expected', e);
  }
}

export default function() {
  
  let grid = new Grid(8, 8);

  grid.get(2, 2, true);

  let r = Rect.make({ x: 4, y: 16, w: 12, h: 8 });

  log(r.key, grid.collide(r), true);
}

function samegrid() {

  let grid = new Grid(8, 8);

  grid.get(2, 2, true);

  log('out', grid.collide(Rect.make({
    x: 0,
    y: 16,
    w: 8,
    h: 8
  })), false);

  log('left in', grid.collide(Rect.make({
    x: 8,
    y: 16,
    w: 8,
    h: 8
  })), true);

  log('middle in', grid.collide(Rect.make({
    x: 16,
    y: 16,
    w: 8,
    h: 8
  })), true);

  log('right in', grid.collide(Rect.make({
    x: 23,
    y: 16,
    w: 8,
    h: 8
  })), true);

  log('right out', grid.collide(Rect.make({
    x: 24,
    y: 16,
    w: 8,
    h: 8
  })), false);  
}
