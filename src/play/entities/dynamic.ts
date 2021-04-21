import { mapRange, NRange } from '../../range';
import { ReleaseRange } from '../../input';
import Grid from '../grid';
import Entity from './entity';

const DeccelDxRange: NRange = [-2, 0],
deccelToDx = mapRange(ReleaseRange, DeccelDxRange);

const AccelDx0Range: NRange = [0, 1],
MaxAccel0Range: NRange = [0, 1],
AccelDxRange: NRange = [0, 4],
MaxAccelRange: NRange = [0, 60],
accelToDx = mapRange(MaxAccelRange, AccelDxRange),
accelToDx0 = mapRange(MaxAccel0Range, AccelDx0Range);


export default class Dynamic {

  readonly grid: Grid;
  readonly entity: Entity;
  remx: number = 0
  remy: number = 0
  dx: number = 0
  dy: number = 0
  
  constructor(grid: Grid, entity: Entity) {
    this.grid = grid;
    this.entity = entity;
  }

  accelX(ax: number) {
    this.dx = accelToDx0(Math.sign(ax)) +
      accelToDx(Math.min(60, ax));
  }

  deccelX(ax: number) {
    this.dx = deccelToDx(ax);
  }

  move() {
    this.remx += this.dx;
    let dx = Math.floor(this.remx);
    this.remx -= dx;
    this.moveX(dx)
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
}
