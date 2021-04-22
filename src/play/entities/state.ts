import * as t from '../ticks';

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
  ticks?: t.Ticks
  hooks: Hooks

  get safeTicks() {
    return this.ticks || 1;
  }

  get on() {
    return this.i >= 0;
  }
  
  constructor(hooks: Hooks, ticks?: t.Ticks) {
    this.i = -1;
    this.ticks = ticks;
    this.hooks = hooks;
  }

  begin(ticks?: t.Ticks) {
    this.ticks = ticks || this.ticks;
    this.i = 0;
    this.hooks.begin?.();
  }

  cut(onCut?: () => void) {
    if (this.i >= 0) {
      this.i = -1;
      onCut?.();
    }
  }

  end() {
    this.i = -1;
    this.hooks.end?.();
  }

  update() {

    if (this.i >= 0) {
      this.i++;

      let t = this.i/(this.ticks || 1);
      this.hooks.update?.(t, this.ticks||this.i);

      if (this.ticks && this.i >= this.ticks) {
        this.end();
      }
    }
  }
}
