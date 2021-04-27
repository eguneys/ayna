import * as t from '../ticks';

export default class Sfx {

  sfxTo?: number
  sfx?: number

  icool: number = 0
  delay: number = t.sixth

  constructor() {
  }

  request(sfx: number) {
    if (this.icool <= 0 && this.sfxTo === undefined) {
      this.icool = this.delay + Math.random() * t.lengths;
      this.sfxTo = sfx;
    }
  }

  update() {
    if (this.icool > 0) {
      this.icool--;
    }
    if (this.sfx) {
      this.sfxTo = undefined;
      this.sfx = undefined;
    }
    if (this.sfxTo) {
      this.sfx = this.sfxTo;
    }
  }
  
}
