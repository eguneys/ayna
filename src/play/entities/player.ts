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
import SlideDirection from './slide';

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
  slideRight: SlideDirection
  slideLeft: SlideDirection
  
  constructor(base: Objects,
              entity: Entity) {
    super(base,
          new Dynamic(entity));

    this.runLeft = new RunDirection(-1);
    this.runRight = new RunDirection(1);
    this.jump = new Jump(this.dynamic, 8 * 4);

    this.slideRight = new SlideDirection(this.dynamic, 1, 8*0.8);
    this.slideLeft = new SlideDirection(this.dynamic, -1, 8*0.8);
    
  }

  update() {
    let xLeft = this.input.btn(InputKey.Left),
    xRight = this.input.btn(InputKey.Right);
    if (xLeft > 0) {
      this.slideLeft.request();
      this.slideRight.upRequest();
      this.runLeft.request();
    } else if (xLeft < 0) {
      this.slideLeft.cool();
      this.runLeft.cool();
    } else {
    }
    if (xRight > 0) {
      this.slideRight.request();
      this.slideLeft.upRequest();
      this.runRight.request();
    } else if (xRight < 0) {
      this.slideRight.cool();
      this.runRight.cool();
    } else {
    }

    let yUp = this.input.btn(InputKey.X);
    if (yUp === 2) {
      this.jump.request();
      this.slideLeft.upRequest();
      this.slideRight.upRequest();
    } else if (yUp > 0) {
    } else if (yUp < 0) {
      // this.jump.request();
    } else if (yUp === 0) {
      this.jump.cutRequest();
    }

    this.dynamic.dx = this.runLeft.dx + this.runRight.dx;
    this.jump.update();
    this.runLeft.update();
    this.runRight.update();
    this.slideRight.update();
    this.slideLeft.update();

    super.update();
  }

  render() {
    this.entity.render(this.draw);
  }
}
