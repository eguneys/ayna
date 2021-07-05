import { Direction } from '../direction';
import Draw from '../../draw';
import Grid from '../grid';
import Rect from '../rect';
import Rooms from '../rooms';
import Entity from './entity';
import { CollideCheck, noCollision } from './collide';

export default class Dynamic {

  get sf() {
    return this.entity.sf;
  }
  
  get grounded(): boolean {
    return this.entity.grounded;
  }

  get wallGrounded(): boolean {
    return this.walled(1) || this.walled(-1);
  }

  walled(dir: Direction): boolean {
    return this.entity.walled(dir);
  }
  
  readonly entity: Entity;
  remx: number = 0
  remy: number = 0
  dx: number = 0
  dy: number = 0

  facing: Direction = -1

  get collide(): CollideCheck {
    return this.entity.collide;
  }

  get facingLeft(): boolean {
    return this.facing === -1;
  }
  
  constructor(entity: Entity) {
    this.entity = entity;
  }

  move(dt: number) {
    let x = this.dx * dt;
    this.remx += x;
    x = Math.floor(this.remx);
    this.remx -= x;
    this.moveX(x)

    let y = this.dy * dt;
    
    this.remy += y;
    y = Math.floor(this.remy);
    this.remy -= y;
    this.moveY(y)
  }

  moveX(amount: number) {
    let step = Math.sign(amount);
    for (let i = 0; i < Math.abs(amount); i++) {
      this.entity.moveX(step);
      if (this.collide(this.entity.ahitbox)) {
        this.dx = 0;
        this.entity.moveX(step * - 1);
        return;
      }
      this.facing = step as Direction;
    }
  }

  moveY(amount: number) {
    let step = Math.sign(amount);
    for (let i = 0; i < Math.abs(amount); i++) {
      this.entity.moveY(step);
      if (this.collide(this.entity.ahitbox)) {
        this.dy = 0;
        this.entity.moveY(step * - 1);
        return;
      }
    }
  }

  render(draw: Draw) {
    if (this.entity.sf && this.entity.si) {
      draw.s(this.entity.sf.x +
        this.entity.si.x * this.entity.sf.w,
             this.entity.sf.y +
        this.entity.si.y * this.entity.sf.h,
             this.entity.sf.w,
             this.entity.sf.h,
             this.entity.adim.x,
             this.entity.adim.y,
             this.entity.adim.w,
             this.entity.adim.h,
             this.facingLeft);
    }
  }
}
