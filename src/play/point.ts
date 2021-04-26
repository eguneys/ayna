export type PointKey = string;

export default class Point {

  static make = (x: number, y: number): Point => {
    return new Point(x, y);
  }

  x: number
  y: number

  get i(): number { return this.x; }
  get j(): number { return this.y; }

  get key(): PointKey {
    return [this.x, this.y].join(' ');
  }

  get neg(): Point {
    return this.scale(-1);
  }
  get half(): Point {
    return this.scale(0.5);
  }
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  sub(p: Point) {
    return this.add(p.neg);
  }
  
  add(p: Point) {
    return new Point(p.x + this.x,
                     p.y + this.y);
  }

  scale(x: number) {
    return this.mul(new Point(x, x));
  }

  mul(p: Point) {
    return new Point(p.x * this.x,
                     p.y * this.y);
  }
  
}
