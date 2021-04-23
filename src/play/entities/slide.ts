import * as t from '../ticks';
import Dynamic from './dynamic';
import Machine from './machine';
import { Direction } from '../direction';

export default class SlideDirection {

  dynamic: Dynamic
  direction: Direction
  machine: Machine

  get liftVMax(): number {
    let liftAccelTicks = this.machine
      .maybeState('liftAccelXY',
                  _ => _.safeTicks)!;
    return 2 * 16 / liftAccelTicks;
  }
  
  get stickVMax(): number {
    return this.maxFall / t.half;
  }

  maxFall: number

  constructor(dynamic: Dynamic,
              direction: Direction,
              maxFall: number) {

    this.maxFall = maxFall;
    
    this.dynamic = dynamic;
    this.direction = direction;

    this.machine = new Machine({
      liftAccelXY: {
        hooks: {
          update: this.liftAccelXYUpdate.bind(this)
        },
        ticks: t.third,
        next: 'liftAccelY'
      },
      liftAccelY: {
        hooks: {
          update: this.liftAccelYUpdate.bind(this)
        },
        ticks: t.sixth,
        next: 'rest'
      },
      stick: {
        hooks: {
          update: this.stickUpdate.bind(this)
        }
      },
      stickRest: {
        hooks: {
          update: this.stickRestUpdate.bind(this)
        },
      },
      rest: {
        hooks: {
          update: this.restUpdate.bind(this)
        }
      },
      nowall: {
        hooks: {
          update: this.nowallUpdate.bind(this)
        }
      }
    }, 'rest');
    
  }

  upRequest() {
    if (this.machine.current === 'rest' ||
      this.machine.current === 'stickRest' ||
      this.machine.current === 'stick') {
      if (!this.dynamic.walled(this.direction)) {
      } else {
        if (!this.dynamic.grounded) {
          this.machine.transition('liftAccelXY');
        }
      }
    }
  }
  
  request() {
    if (this.machine.current === 'rest') {
      if (!this.dynamic.walled(this.direction)) {
      } else {
        if (!this.dynamic.grounded) {
          this.machine.transition('stickRest');
        }
      }
    }
  }

  cool() {
    if (this.machine.current === 'stick' ||
      this.machine.current === 'stickRest') {
      this.machine.transition('rest');
    }
  }

  liftAccelXYUpdate(i: number) {
    this.dynamic.dx = i * this.direction * -1 * this.liftVMax * 0.8;
    this.dynamic.dy = -i * this.liftVMax;
  }

  liftAccelYUpdate(i: number) {
    this.dynamic.dy = (i-1) * this.liftVMax;
  }

  stickRestUpdate(i: number) {
    if (this.dynamic.dy <= 0) {
      this.dynamic.dy *= 1.1;
    } else {
      this.machine.transition('stick');
    }
  }

  stickUpdate() {
    if (!this.dynamic.walled(this.direction)) {
      this.machine.transition('nowall');
    }
    this.dynamic.dy = this.stickVMax;
  }

  nowallUpdate() {
    if (this.dynamic.walled(this.direction)) {
      this.machine.transition('rest');
    }
  }

  restUpdate() {
    if (!this.dynamic.walled(this.direction)) {
      this.machine.transition('nowall');
    }
  }

  update() {
    this.machine.update();
  }
  
}
