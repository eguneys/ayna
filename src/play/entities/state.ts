import * as t from '../ticks';
import ease, { EasingFunc } from '../ease';

export type HooksUpdate = (t: number, ticks?: t.Ticks) => void
export type HooksBegin = () => void
export type HooksEnd = () => void

export type Hooks = {
  update?: HooksUpdate,
  begin?: HooksBegin,
  end?: HooksEnd
};

export default class State {

  i: number
  easing: EasingFunc
  ticks?: t.Ticks
  hooks: Hooks

  get safeTicks() {
    return this.ticks || 1;
  }

  get on() {
    return this.i >= 0;
  }
  
  constructor(hooks: Hooks,
              ticks?: t.Ticks,
              _ease?: EasingFunc) {
    this.i = -1;
    this.ticks = ticks;
    this.hooks = hooks;
    this.easing = _ease || ease.linear;
  }

  begin(ticks?: t.Ticks) {
    this.ticks = ticks || this.ticks;
    this.i = 0;
    this.hooks.begin?.();
  }

  cut(onCut?: () => void) {
    if (this.i >= 0) {
      onCut?.();
      this.end();
    }
  }

  end() {
    this.i = -1;
    this.hooks.end?.();
  }

  update(dt: number) {

    if (this.i >= 0) {
      this.i+=dt;

      let t = this.i/(this.ticks || 1);
      this.hooks.update?.(this.easing(t), this.ticks||this.i);

      if (this.ticks && this.i >= this.ticks) {
        this.end();
      }
    }
  }
}
