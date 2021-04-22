import Dynamic from './dynamic';
import * as t from '../ticks';
import Machine from './machine';

export default class Jump {

  machine: Machine
  
  maxHeight: number

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

  get groundedGrace() {
    return this.dynamic.grounded;
  }
  
  dynamic: Dynamic
  
  constructor(dynamic: Dynamic, maxHeight: number) {
    this.dynamic = dynamic;

    this.maxHeight = maxHeight;


    this.machine = new Machine({
      liftAccel: {
        hooks: {
          begin: this.liftAccelBegin.bind(this),
          update: this.liftAccelUpdate.bind(this)
        },
        next: 'liftDeccel',
        ticks: 1
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
        ticks: 5
      },
      landAccel: {
        hooks: {
          begin: this.landAccelBegin.bind(this),
          update: this.landAccelUpdate.bind(this),
        },
        next: 'gravity',
        ticks: t.sixth
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
        ticks: 5,
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

  gravityUpdate() {
    if (this.dynamic.grounded) {
      this.machine.transition('rest');
    }
  }
  
  restUpdate(i: number) {
    if (!this.dynamic.grounded) {
      this.machine.transition('coyote');
    }
  }

  liftAccelBegin() {}
  landAccelBegin() {}
  
  gravityBegin() {
    this.dynamic.dy = this.landVMax * 0.5;
  }
  
  restBegin() {
    this.dynamic.dy = 0;
  }

  liftHangBegin() {
    this.dynamic.dy = 0;
  }

  liftDeccelUpdate(i: number) {
    this.dynamic.dy = (i-1) * this.vMax;
  }
  
  liftAccelUpdate(i: number) {
    this.dynamic.dy = (-i) * this.vMax;
  }

  landAccelUpdate(i: number) {
    this.dynamic.dy = i * this.landVMax;
  }

  update() {
    this.machine.update();
  }
  
}