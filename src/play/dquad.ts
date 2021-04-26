import Rect, { RectKey } from './rect';
import Point from './point';

export default class DQuad<A> {

  data: Map<RectKey, A>
  
  constructor() {
    this.data = new Map();
  }

  add(rect: Rect, a: A) {
    this.data.set(rect.key, a);
  }

  checkPoint(p: Point) {
    return this.check(Rect.point(p))[0];
  }
  
  check(r: Rect) {

    let res: Array<A> = [];
    
    this.data.forEach((a, key) => {
      if (Rect.fromKey(key).intersect(r)) {
        res.push(a);
      }
    });

    return res;
  }

  checkAny(r: Rect) {
    return this.check(r).length > 0;
  }
}
