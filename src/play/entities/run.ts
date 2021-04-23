import Dynamic from './dynamic';
import * as t from '../ticks';
import State from './state';
import { Direction } from '../direction';

export default class RunDirection {

  Accel: State = new State({
    update: this.onAccel.bind(this),
    end: () => this.Pace.begin()
  }, t.third);
  Pace: State = new State({
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

  restBegin() {
    this.dx = 0;
  }

  onAccel(i: number) {
    this.dx = i * this.direction * this.vMax;
  }

  onPace() {
    this.dx = this.direction * this.vMax;
  }

  update() {
    this.Accel.update();
    this.Pace.update();
    this.Rest.update();
  }
  
}
