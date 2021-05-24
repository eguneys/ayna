import  i from './i';

export type PointKey = string;

export default class Point {

  static zero = new Point(0, 0);
  static one = new Point(1, 1);
  
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

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get normalize(): Point {
    return this.scale(1/this.length);
  }
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  dist(p: Point) {
    return Math.sqrt(
      Math.pow(this.x - p.x, 2) +
        Math.pow(this.y - p.y, 2));
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

  ipol(_i: number, to: Point) {
    return new Point(
      i(_i, this.x, to.x),
      i(_i, this.y, to.y)
    );
  }  
  
}
