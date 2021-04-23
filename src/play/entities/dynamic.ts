import { Direction } from '../direction';
import Grid from '../grid';
import Entity from './entity';

export default class Dynamic {

  get grid(): Grid {
    return this.entity.grid;
  };

  get grounded(): boolean {
    return this.entity.grounded;
  }

  walled(dir: Direction): boolean {
    return this.entity.walled(dir);
  }
  
  readonly entity: Entity;
  remx: number = 0
  remy: number = 0
  dx: number = 0
  dy: number = 0
  
  constructor(entity: Entity) {
    this.entity = entity;
  }

  move() {
    this.remx += this.dx;
    let dx = Math.floor(this.remx);
    this.remx -= dx;
    this.moveX(dx)

    this.remy += this.dy;
    let dy = Math.floor(this.remy);
    this.remy -= dy;
    this.moveY(dy)
  }

  moveX(amount: number) {
    let step = Math.sign(amount);
    for (let i = 0; i < Math.abs(amount); i++) {
      this.entity.moveX(step);
      if (this.grid.collide(this.entity.ahitbox)) {
        this.dx = 0;
        this.entity.moveX(step * - 1);
        return;
      }
    }
  }

  moveY(amount: number) {
    let step = Math.sign(amount);
    for (let i = 0; i < Math.abs(amount); i++) {
      this.entity.moveY(step);
      if (this.grid.collide(this.entity.ahitbox)) {
        this.dy = 0;
        this.entity.moveY(step * - 1);
        return;
      }
    }
  }
}
