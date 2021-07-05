import * as t from '../ticks';
import Dynamic from './dynamic';
import Machine from './machine';
import { Direction } from '../direction';
import PSfi from './psfi';
import * as sf from './sprites';
import Rect from '../rect';

export default class SlideDirection {

  dynamic: Dynamic
  direction: Direction
  machine: Machine

  psfi: PSfi = new PSfi();

  get sfi() { return this.psfi.sfi }

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
          begin: this.liftAccelBegin.bind(this),
          end: this.liftAccelEnd.bind(this),
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
          end: this.stickEnd.bind(this),
          begin: this.stickBegin.bind(this),
          update: this.stickUpdate.bind(this)
        }
      },
      stickLift: {
        hooks: {
          begin: this.stickBegin.bind(this),
          end: this.stickEnd.bind(this),
          update: this.stickLiftUpdate.bind(this)
        },
      },
      quickStickThenRest: {
        hooks: {
          begin: this.stickBegin.bind(this),
          end: this.stickEnd.bind(this),
          update: this.quickStickThenRestUpdate.bind(this)
        },
        ticks: t.half,
        next: 'rest'
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
    }, 'nowall');
    
  }

  upRequest() {
    if (['rest',
         'stickLift',
         'stick',
         'quickStickThenRest'].includes(this.machine.current)) {
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
          this.machine.transition('stickLift');
        }
      }
    }
  }

  cool() {
    if (this.machine.current === 'stick' ||
      this.machine.current === 'stickLift') {
      this.machine.transition('rest');
    }
  }

  stickBegin() {
    this.dynamic.facing = this.direction;
    this.psfi.sf = Rect.make(sf.player.stick);
  }


  stickEnd() {
    this.psfi.sfi = undefined;
  }

  liftAccelBegin() {
    this.psfi.sf = Rect.make(sf.player.wlift);
  }

  liftAccelEnd() {
    this.psfi.sfi = undefined;
  }

  liftAccelXYUpdate(i: number) {
    this.dynamic.dx = i * this.direction * -1 * this.liftVMax * 0.8;
    this.dynamic.dy = -i * this.liftVMax;
  }

  liftAccelYUpdate(i: number) {
    this.dynamic.dy = (i-1) * this.liftVMax;
  }

  stickLiftUpdate(i: number) {
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

  quickStickThenRestUpdate() {
    if (this.dynamic.dy <= 0) {
      this.dynamic.dy *= 1.1;
    } else {
      this.dynamic.dy = this.stickVMax;
    }
  }

  nowallUpdate() {
    if (this.dynamic.walled(this.direction)) {
      this.machine.transition('quickStickThenRest');
    }
  }

  restUpdate() {
    if (!this.dynamic.walled(this.direction)) {
      this.machine.transition('nowall');
    }
  }

  update(dt: number) {
    this.machine.update(dt);
  }
  
}
