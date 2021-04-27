import { InputKey } from '../../input';
import { Context, Cus } from '../../context';
import { Maker } from './maker';
import { PlayerChar } from '../chars';
import Entity from './entity';
import Dynamic from './dynamic';
import { CollideCheck } from './collide';
import * as t from '../ticks';
import * as bs from '../bounds';
import Point from '../point';
import Rect from '../rect';
import Room from '../room';
import Rooms from '../rooms';
import DCus from './dcus';
import Jump from './jump';
import RunDirection from './run';
import SlideDirection from './slide';
import Dash from './dash';
import PSfi from './psfi';
import * as sf from './sprites';

export default class Player extends DCus {

  static maker: Maker<Player> = {
    hitbox: Rect.make({ x: 0, y: -5, w: 8, h: 12 }),
    dim: Rect.make({ x: -3, y: -10, w: 13, h: 18 }),
    char: PlayerChar,
    apply(context: Context,
          collide: CollideCheck,
          i: number, j: number) {

      let entity = new Entity(collide,
                              this.dim,
                              this.hitbox,
                              i, j);

      return new Player(context, entity);
    }
  }
  
  jump: Jump
  runLeft: RunDirection
  runRight: RunDirection
  slideRight: SlideDirection
  slideLeft: SlideDirection
  dash: Dash
  pause: boolean = false
  
  get target(): Point {
    return this.entity.ahitbox.xy.sub(bs.HalfScreenSize);
  }

  get origin(): Point {
    return this.entity.ahitbox.origin;
  }

  restI: number = 0;
  psfi: PSfi = new PSfi(Rect.make(sf.player.rest));
  
  constructor(context: Context,
              entity: Entity) {
    super(context,
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

    this.psfi.si = this.restI++ % t.half / t.half;
    
    this.entity.sfi =
      this.dash.sfi ||
      this.slideLeft.sfi ||
      this.slideRight.sfi ||
      this.jump.sfi ||
      this.runLeft.sfi ||
      this.runRight.sfi ||
      this.psfi.sfi;

    this.dynamic.dx = this.runLeft.dx + this.runRight.dx;
    this.jump.update();
    this.runLeft.update();
    this.runRight.update();
    this.slideRight.update();
    this.slideLeft.update();
    this.dash.update();

    if (this.pause) {
    } else {
      super.update();
    }
  }

  render() {
    this.dynamic.render(this.draw);
    this.entity.debug(this.draw)
  }
}
