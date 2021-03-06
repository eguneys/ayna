import Dynamic from './dynamic';
import * as t from '../ticks';
import Machine from './machine';
import ease from '../ease';
import PSfi from './psfi';
import * as sf from './sprites';
import Rect from '../rect';
import Point from '../point';

export default class Jump {

  static liftDimExpand = Point.make(0.8, 1.2);
  
  machine: Machine
  
  psfi: PSfi = new PSfi();

  get sfi() { return this.psfi.sfi };

  set si(i: number) {
    let p = Point.make(i, 0);

    if (this.sfi) {
      this.sfi[1] = p;
    }
  }

  get vMax(): number {
    let liftAccelTicks = this.machine
      .maybeState('liftAccel', _ => _.safeTicks)!,
    liftDeccelTicks = this.machine
      .maybeState('liftDeccel', _ => _.safeTicks)!;
    return 2 * this.maxHeight / (liftAccelTicks + liftDeccelTicks);
  }

  get landVMax(): number {
    let accelTicks = this.machine
      .maybeState('landAccel',
                  _ => _.safeTicks)!;
    return 2 * this.maxHeight / accelTicks;
  }

  gravityTicks = t.fifth

  get fallVMax(): number {
    return this.maxHeight / this.gravityTicks;
  }

  get groundedGrace() {
    return this.dynamic.grounded;
  }

  constructor(readonly dynamic: Dynamic,
              readonly maxHeight: number) {

    this.machine = new Machine({
      liftAccel: {
        hooks: {
          begin: this.liftAccelBegin.bind(this),
          update: this.liftAccelUpdate.bind(this)
        },
        next: 'liftDeccel',
        ticks: t.oneth
      },
      liftDeccel: {
        hooks: {
          update: this.liftDeccelUpdate.bind(this)
        },
        next: 'liftHang',
        ticks: t.third
      },
      liftHang: {
        hooks: {
          begin: this.liftHangBegin.bind(this)
        },
        next: 'landAccel',
        ticks: t.lengths
      },
      landAccel: {
        hooks: {
          begin: this.landAccelBegin.bind(this),
          update: this.landAccelUpdate.bind(this),
        },
        next: 'gravity',
        ticks: t.oneth
      },
      rest: {
        hooks: {
          begin: this.restBegin.bind(this),
          update: this.restUpdate.bind(this)
        },
      },
      coyote: {
        hooks: {
        },
        ticks: t.lengths,
        next: 'gravity'
      },
      gravity: {
        hooks: {
          begin: this.gravityBegin.bind(this),
          update: this.gravityUpdate.bind(this)
        }
      }
    }, 'rest');
    
  }

  request() {
    if (this.machine.current === 'rest' ||
      this.machine.current === 'coyote') {
      this.machine.transition('liftAccel');
    }
  }

  cutRequest() {
    if (this.machine.current === 'liftAccel' ||
      this.machine.current === 'liftDeccel') {
      this.machine.transition('landAccel');
    }
  }

  gravityUpdate(i: number) {
    if (this.dynamic.grounded) {
      this.machine.transition('rest');
    } else {
      let _t = Math.min(i, this.gravityTicks)/this.gravityTicks;
      this.dynamic.dy = _t * this.fallVMax;

      this.dynamic.entity.dimExpand = this.dynamic.entity.dimExpand.ipol(i % t.twoth / t.twoth, Point.one);
    }
  }
  
  restUpdate(i: number) {
    if (!this.dynamic.grounded) {
      this.machine.transition('coyote');
    }
  }

  liftAccelBegin() {
    this.psfi.sf = Rect.make(sf.player.jump);
    this.si = 0;
  }
  landAccelBegin() {}
  
  gravityBegin() {
    //this.dynamic.dy = this.landVMax * 0.5;

    this.psfi.sf = Rect.make(sf.player.jump);
    this.si = 2;
  }
  
  restBegin() {
    this.dynamic.dy = 0;
    this.psfi.sfi = undefined;
    this.dynamic.entity.dimExpand = Point.one;
  }

  liftHangBegin() {
    this.dynamic.dy = 0;
    this.si = 1;
  }

  liftDeccelUpdate(i: number) {
    this.dynamic.dy = (i-1) * this.vMax;

    this.dynamic.entity.dimExpand = Point.one.ipol(Math.min(1, (i + 0.5)), Jump.liftDimExpand);
  }
  
  liftAccelUpdate(i: number) {
    this.dynamic.dy = (-i) * this.vMax;
    this.si = Math.floor(i * 1);
  }

  landAccelUpdate(i: number) {
    if (this.dynamic.grounded) {
      this.machine.transition('rest');
    }
    this.dynamic.dy = 0;
  }

  update(dt: number) {
    this.machine.update(dt);
  }
  
}
