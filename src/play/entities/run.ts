import * as sf from './sprites';
import Rect from '../rect';
import Point from '../point';
import Dynamic from './dynamic';
import * as t from '../ticks';
import State from './state';
import { Direction } from '../direction';
import { Sfi } from './sfi'

export default class RunDirection {

  sfi?: Sfi

  set sf(r: Rect) {
    if (!this.sfi) {
      this.sfi = [r, Point.zero];
    } else {
      this.sfi[0] = r;
    }
  }

  set si(i: number) {
    let p = Point.make(Math.floor(i * 3), 0);
    if (this.sfi) {
      this.sfi[1] = p;
    }
  }
  
  Accel: State = new State({
    begin: this.accelBegin.bind(this),
    update: this.onAccel.bind(this),
    end: () => this.Pace.begin()
  }, t.third);
  Pace: State = new State({
    begin: this.paceBegin.bind(this),
    update: this.onPace.bind(this)
  });
  Rest: State = new State({
    begin: this.restBegin.bind(this)
  });

  maxAccelX: number = 8 * 2

  get vMax(): number {
    return 2 * this.maxAccelX / this.Accel.safeTicks;
  }

  direction: Direction

  dx: number
  
  constructor(direction: Direction) {
    this.direction = direction;

    this.dx = 0;
    
    this.Rest.begin();
  }

  request() {
    this.Rest.cut(() => {
      this.Accel.begin();
    });
  }

  cool() {
    this.Accel.cut(() => {
      this.Rest.begin();
    });
    this.Pace.cut(() => {
      this.Rest.begin();
    });
  }

  accelBegin() {
    this.sf = Rect.make(sf.player.turn);
  }

  paceBegin() {
    this.sf = Rect.make(sf.player.pace);
  }
  
  restBegin() {
    this.dx = 0;

    this.sfi = undefined;
  }

  onAccel(i: number) {
    this.dx = i * this.direction * this.vMax;
    this.si = i;
  }

  onPace(i: number) {
    this.dx = this.direction * this.vMax;
    this.si = i % t.half / t.half;
  }

  update() {
    this.Accel.update();
    this.Pace.update();
    this.Rest.update();
  }
  
}
