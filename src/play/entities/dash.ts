import * as t from '../ticks';
import Dynamic from './dynamic';
import Machine from './machine';
import { Direction } from '../direction';
import ease from '../ease';
import PSfi from './psfi';
import * as sf from './sprites';
import Rect from '../rect';

export default class Dash {

  dynamic: Dynamic
  xDirection: Direction
  yDirection: Direction
  machine: Machine

  psfi: PSfi = new PSfi();
  get sfi() { return this.psfi.sfi };

  
  maxDJump: number = 1;
  dJump: number = this.maxDJump;

  get maxDashV() {
    let dashTicks = this.machine
      .maybeState('dash',
                  _ => _.safeTicks)!;

    return 2 * 32 / dashTicks;
  }
  
  constructor(dynamic: Dynamic) {
    this.dynamic = dynamic;
    this.xDirection = 0;
    this.yDirection = 0;
    this.machine = new Machine({
      dashInput: {
        hooks: {
          update: this.dashInputUpdate.bind(this)
        },
        next: 'dash',
        ticks: t.lengths
      },
      dash: {
        hooks: {
          begin: this.dashBegin.bind(this),
          update: this.dashUpdate.bind(this)
        },
        next: 'dashCool',
        ticks: t.third,
        easing: ease.easeInOutQuad
      },
      dashCool: {
        hooks: {
          update: this.dashCoolUpdate.bind(this)
        },
        next: 'rest',
        ticks: t.third
      },
      rest: {
        hooks: {
          begin: this.restBegin.bind(this),
          update: this.restUpdate.bind(this)
        }
      }
    }, 'rest');
  }

  xRequest(dir: Direction) {
    if (this.machine.current === 'dashInput') {
      this.xDirection = dir;
    }
  }

  yRequest(dir: Direction) {
    if (this.machine.current === 'dashInput') {
      this.yDirection = dir;
    }
  }
  
  request() {
    if (this.machine.current === 'rest') {
      if (this.dJump > 0) {
        this.machine.transition('dashInput');
      }
    }
  }

  restBegin() {
    this.xDirection = 0;
    this.yDirection = 0;

    this.psfi.sfi = undefined;
  }

  restUpdate() {
    if (this.dynamic.grounded || this.dynamic.wallGrounded) {
      this.dJump = this.maxDJump;
    }
  };

  dashBegin() {
    this.dJump--;
    this.psfi.sf = Rect.make(sf.player.dash);
  }

  dashInputUpdate(i: number) {
    this.dynamic.dx = (1-i) * this.xDirection;
    this.dynamic.dy = (1-i) * this.yDirection;
  }
  
  dashUpdate(i: number) {
    this.dynamic.dx = i * this.xDirection * this.maxDashV * 0.5;
    this.dynamic.dy = i * this.yDirection * this.maxDashV * 0.5;
  }

  dashCoolUpdate(i: number) {
    this.dynamic.dx = (1-i) * this.xDirection * this.maxDashV * 0.5;
    this.dynamic.dy = (1-i) * this.yDirection * this.maxDashV * 0.5;
  }
  
  update() {
    this.machine.update();
  }
  
}
