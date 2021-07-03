import Point from './point';
import  i from './i';

export type RectDef = {
  x: number,
  y: number,
  w: number,
  h: number
}

export type RectKey = string

function key2Def(key: RectKey): RectDef {
  let [x, y, w, h] = key.split(' ').map(_ => parseInt(_));
  return {
    x, y, w, h
  };
}

function def2Key({x,y,w,h}: RectDef) {
  return `${x} ${y} ${w} ${h}`;
}

export default class Rect {

  static zero: Rect = new Rect(0, 0, 0, 0);
  
  static fromPoints = (points: Array<Point>): Rect => {
    points.sort((p1, p2) => {
      return (p1.x - p2.x) === 0 ? (p1.y - p2.y) : (p1.x - p2.x);
    });

    return points.reduce((r, p) => {
      if (r === Rect.empty) {
        return Rect.make({
          x: p.x, y: p.y, w: 1, h: 1
        });
      } else {
        if (r.x + r.w === p.x) {
          r = r.expand(1, 0);
        }
        if (r.y + r.h === p.y) {
          r = r.expand(0, 1);
        }
        return r;
      }
    }, Rect.empty);
  }

  
  static fromKey = (key: RectKey) =>
    Rect.make(key2Def(key));
  
  static empty: Rect = new Rect(0, 0, 0, 0);

  static make = ({ x, y,
                   w, h }: RectDef) => new Rect(x, y, w, h);

  static point = (p: Point) =>
    Rect.fromPoints([p]);

  def: RectDef

  get x(): number { return this.def.x; }
  get y(): number { return this.def.y; }
  get w(): number { return this.def.w; }
  get h(): number { return this.def.h; }

  get key(): RectKey {
    return def2Key(this.def);
  }

  get top(): number {
    return this.y;
  }

  get left(): number {
    return this.x;
  }

  get right(): number {
    return this.x + this.w;
  }

  get bottom(): number {
    return this.y + this.h;
  }

  get xy(): Point { return Point.make(this.x, this.y); }
  get wh(): Point { return Point.make(this.w, this.h); }

  get origin(): Point { return Point.make(this.x + this.w / 2,
                                          this.y + this.h / 2); }


  get leftRect(): Rect {
    return new Rect(this.x,
                    this.y,
                    this.w/2,
                    this.h/2);
  }

  get rightRect(): Rect {
    return this.leftRect
      .translate(this.w/2,
                 this.h/2);
  }
  
  constructor(x: number, y: number, w: number, h: number) {
    this.def = {
      x, y, w, h
    };
  }

  div(w: number, h: number) {
    return this.mul(1/w, 1/h);
  }
  
  mul(w: number, h: number) {
    let x = Math.floor(this.x * w),
    y = Math.floor(this.y * h),
    _w = Math.ceil(this.w * w),
    _h = Math.ceil(this.h * h);

    return new Rect(x, y, _w, _h);
  }

  add(r: Rect) {
    return new Rect(this.x + r.x,
                    this.y + r.y,
                    this.w + r.w,
                    this.h + r.h);
  }

  intersect(r: Rect) {
    return !(r.left > this.right ||
      r.right < this.left ||
      r.top > this.bottom ||
      r.bottom < this.top);
  }

  lock(r: Rect) {
    let x = Math.max(this.x, r.x),
    y = Math.max(this.y, r.y);

    x = Math.min(x, r.right - this.w);
    y = Math.min(y, r.bottom - this.h);

    return this.move(x, y);
  }

  approach(pos: Point, ease: number, maxDist: number) {

    let move = pos
      .sub(this.xy)
      .scale(ease);

    if (move.length > maxDist) {
      move = move.normalize.scale(maxDist);
    }
    
    return this.translate(move.x, move.y);
  }
  
  move(x: number, y: number) {
    if (this.x === x && this.y === y) {
      return this;
    }
    return new Rect(x,
                    y,
                    this.w,
                    this.h);    
  }

  translate(x: number, y: number) {
    return this.move(this.x + x, this.y + y);
  }

  expand(w: number, h: number) {
    if (h === 0 && w === 0) {
      return this;
    }
    return new Rect(this.x,
                    this.y,
                    this.w + w,
                    this.h + h);
  }

  expandCentered(w: number, h: number) {
    if (h === 0 && w === 0) {
      return this;
    }
    return new Rect(this.x - w / 2,
                    this.y - h / 2,
                    this.w + w,
                    this.h + h);
  }

  expandM(w: number, h: number) {
    return this.expandCentered(this.w * w - this.w, this.h * h - this.h);
  }

  equal(def: RectDef) {
    return this.x === def.x &&
      this.y === def.y &&
      this.w === def.w &&
      this.h === def.h;
  }

  i(_i: number, to: Rect) {
    return new Rect(
      i(_i, this.x, to.x),
      i(_i, this.y, to.y),
      i(_i, this.w, to.w),
      i(_i, this.h, to.h)
    );
  }

}
