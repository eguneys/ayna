import { InputKey } from '../../input';
import { Context, Cus } from '../../context';
import { Maker } from './maker';
import { PlayerChar } from '../chars';
import Entity from './entity';
import Dynamic from './dynamic';
import * as t from '../ticks';
import { Rect } from '../rect';
import Objects from '../objects';
import DCus from './dcus';
import Jump from './jump';
import RunDirection from './run';
import SlideDirection from './slide';
import Dash from './dash';

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
  dash: Dash
  
  constructor(base: Objects,
              entity: Entity) {
    super(base,
          new Dynamic(entity));

    this.runLeft = new RunDirection(-1);
    this.runRight = new RunDirection(1);
    this.jump = new Jump(this.dynamic, 8 * 4);

    this.slideRight = new SlideDirection(this.dynamic, 1, 8*0.8);
    this.slideLeft = new SlideDirection(this.dynamic, -1, 8*0.8);

    this.dash = new Dash(this.dynamic);
    
  }

  update() {
    let xLeft = this.input.btn(InputKey.Left),
    xRight = this.input.btn(InputKey.Right),
    yUp = this.input.btn(InputKey.Up),
    yDown = this.input.btn(InputKey.Down),
    btnX = this.input.btn(InputKey.X),
    btnC = this.input.btn(InputKey.C);
    
    if (xLeft > 0) {
      this.dash.xRequest(-1);
      this.slideLeft.request();
      this.runLeft.request();
      if (btnX > 0) {
        this.slideRight.upRequest();
      }
    } else if (xLeft < 0) {
      this.slideLeft.cool();
      this.runLeft.cool();
    } else {
    }
    if (xRight > 0) {
      this.dash.xRequest(1);
      this.slideRight.request();
      this.runRight.request();

      if (btnX > 0) {
        this.slideLeft.upRequest();
      }
      
    } else if (xRight < 0) {
      this.slideRight.cool();
      this.runRight.cool();
    } else {
    }

    if (btnX > 0) {
      if (btnX < t.sixth) {
        this.slideLeft.upRequest();
        this.slideRight.upRequest();
      }
      if (btnX < t.second) {
        this.jump.request();
      }
    } else if (btnX < 0) {
      // this.jump.request();
    } else if (btnX === 0) {
      this.jump.cutRequest();
    }

    if (btnC > 0) {
      if (btnC < t.second) {
        this.dash.request();
      }
    }

    if (yUp > 0) {
      this.dash.yRequest(-1);
    } else if (yUp < 0) {
    }

    
    if (yDown > 0) {
      this.dash.yRequest(1);
    } else if (yDown < 0) {
    }

    this.dynamic.dx = this.runLeft.dx + this.runRight.dx;
    this.jump.update();
    this.runLeft.update();
    this.runRight.update();
    this.slideRight.update();
    this.slideLeft.update();
    this.dash.update();

    super.update();
  }

  render() {
    this.entity.render(this.draw);
  }
}
