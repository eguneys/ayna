import * as t from '../ticks';

export default class Sfx {

  sfxNow?: number
  sfx?: number

  icool: number = 0
  delay: number = t.third

  constructor() {
  }

  now(sfx: number) {
    if (this.icool < t.lengths) {
      this.sfxNow = sfx;
    }
  }
  
  request(sfx: number) {
    if (this.icool <= 0) {
      this.icool = this.delay + Math.random() * t.lengths;
      this.sfx = sfx;
    }
  }

  update() {
    if (this.icool > 0) {
      this.icool--;
    }
    if (this.sfx) {
      this.sfx = undefined;
    }
    if (this.icool <= 0) {
      if (this.sfxNow) {
        this.sfx = this.sfxNow;
        this.sfxNow = undefined;
      }
    }
  }
  
}
