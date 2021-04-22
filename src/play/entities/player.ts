import { InputKey } from '../../input';
import { Context, Cus } from '../../context';
import { Maker } from './maker';
import { PlayerChar } from '../chars';
import Entity from './entity';
import Dynamic from './dynamic';
import { Rect } from '../rect';
import Objects from '../objects';
import DCus from './dcus';
import Jump from './jump';
import RunDirection from './run';

export const maker: Maker = {
  hitbox: { x: 2, y: -2, w: 8, h: 8 },
  dim: { x: 0, y: 0, w: 12, h: 12 },
  char: PlayerChar,
  apply(base: Objects, i: number, j: number) {

    let entity = new Entity(base.grid,
                            this.dim,
                            this.hitbox,
                            i, j);

    return new Player(base, entity);
  }
}

export class Player extends DCus {

  jump: Jump
  runLeft: RunDirection
  runRight: RunDirection
  
  constructor(base: Objects,
              entity: Entity) {
    super(base,
          new Dynamic(entity));

    this.runLeft = new RunDirection(-1);
    this.runRight = new RunDirection(1);
    this.jump = new Jump(this.dynamic, 8 * 4);
    
  }

  update() {
    let xLeft = this.input.btn(InputKey.Left),
    xRight = this.input.btn(InputKey.Right);
    if (xLeft > 0) {
      this.runLeft.request();
    } else if (xLeft < 0) {
      this.runLeft.cool();
    } else {
    }
    if (xRight > 0) {
      this.runRight.request();
    } else if (xRight < 0) {
      this.runRight.cool();
    } else {
    }

    let yUp = this.input.btn(InputKey.Up);
    if (yUp > 0) {
      this.jump.request();
    } else if (yUp < 0) {
      this.jump.request();
    } else if (yUp === 0) {
      this.jump.cutRequest();
    }

    this.dynamic.dx = this.runLeft.dx + this.runRight.dx;
    this.jump.update();
    this.runLeft.update();
    this.runRight.update();

    super.update();
  }

  render() {
    this.entity.render(this.draw);
  }
}
