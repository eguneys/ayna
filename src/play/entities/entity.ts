import { Direction } from '../direction';
import Draw from '../../draw';
import Point from '../point';
import Rect from '../rect';
import { CollideCheck, noCollision } from './collide';

export default class Entity {

  readonly collide: CollideCheck
  readonly dim: Rect
  readonly hitbox: Rect
  sfi?: [Rect, Point]

  dimExpand: Point = Point.make(1, 1);
  
  get sf() {
    return this.sfi?.[0];
  }

  get si() {
    return this.sfi?.[1];
  }

  get ahitbox() {
    return this.hitbox.translate(this.x, this.y);
  }
  get adim() {
    return this.dim.translate(this.x, this.y)
      .expandM(this.dimExpand.x, this.dimExpand.y);
  }
  x: number
  y: number

  get grounded() {
    this.y += 1;
    let res = this.collide(this.ahitbox);
    this.y -= 1;
    return res;
  }

  walled(dir: Direction) {
    this.x += dir * 3;
    let res = this.collide(this.ahitbox);
    this.x -= dir * 3;
    return res;
  }

  cliff(dir: Direction): boolean {
    this.x += dir * this.hitbox.w/2;
    let nextGrounded = this.grounded;
    this.x -= dir * this.hitbox.w/2;
    return this.grounded && !nextGrounded;
  }
  
  constructor(collide: CollideCheck,
              dim: Rect,
              hitbox: Rect,
              x: number,
              y: number) {
    this.collide = collide;
    this.dim = dim;
    this.hitbox = hitbox;
    this.x = x;
    this.y = y;
  }

  moveX(dx: number) {
    this.x += dx;
  }

  moveY(dy: number) {
    this.y += dy;
  }

  render(draw: Draw) {
    if (this.sf) {
      draw.s(this.sf.x,
             this.sf.y,
             this.sf.w,
             this.sf.h,
             this.adim.x,
             this.adim.y,
             this.adim.w,
             this.adim.h);
    }
  }
  
  debug(draw: Draw) {
    draw.strokeStyle('green');
    draw.stroke(this.ahitbox.x,
                this.ahitbox.y,
                this.ahitbox.w,
                this.ahitbox.h);
  }
  
}
