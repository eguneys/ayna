import { Direction } from '../direction';
import Draw from '../../draw';
import Rect from '../rect';
import { CollideCheck, noCollision } from './collide';

export default class Entity {

  readonly collide: CollideCheck
  readonly dim: Rect
  readonly hitbox: Rect

  get ahitbox() {
    return this.hitbox.translate(this.x, this.y);
  }
  get adim() {
    return this.dim.translate(this.x, this.y);
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
    draw.strokeStyle('green');
    draw.stroke(this.ahitbox.x,
                this.ahitbox.y,
                this.ahitbox.w,
                this.ahitbox.h);
  }
  
}
