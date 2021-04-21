import { InputKey } from '../../input';
import { Context, Cus } from '../../context';
import { Maker } from './maker';
import { PlayerChar } from '../chars';
import Entity from './entity';
import Dynamic from './dynamic';
import { Rect } from '../rect';
import Objects from '../objects';
import DCus from './dcus';

export const maker: Maker = {
  hitbox: { x: 2, y: -2, w: 8, h: 8 },
  dim: { x: 0, y: 0, w: 12, h: 12 },
  char: PlayerChar,
  apply(base: Objects, i: number, j: number) {

    let entity = new Entity(this.dim,
                            this.hitbox,
                            i, j);

    return new Player(base, entity);
  }
}

export class Player extends DCus {

  constructor(base: Objects,
              entity: Entity) {
    super(base.context,
          new Dynamic(base.grid, entity));
  }

  update() {
    let xLeft = this.input.btn(InputKey.Left),
    xRight = this.input.btn(InputKey.Right);
    if (xLeft > 0) {
      this.dynamic.accelX(xLeft * -1);
    } else if (xLeft < 0) {
      this.dynamic.deccelX(xLeft);
    } else if (xRight > 0) {
      this.dynamic.accelX(xRight);
    } else if (xRight < 0) {
      this.dynamic.deccelX(xRight * -1);
    } else {
      this.dynamic.deccelX(0);
    }

    let yUp = this.input.btn(InputKey.Up),
    if (yUp > 0) {
      this.dynamic.accelY(yUp);
    } else if (yUp < 0) {
      this.dynamic.accelY(yUp);
    } else {
      this.dynamic.deccelY(0);
    }

    
    super.update();
  }

  render() {
    this.entity.render(this.draw);
  }
}
