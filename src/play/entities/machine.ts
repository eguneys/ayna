import * as t from '../ticks';

import State,
{ Hooks,
  HooksBegin,
  HooksEnd,
  HooksUpdate } from './state';

export type StateRefKey = string

export type StateRef = {
  hooks: Hooks,
  next?: StateRefKey,
  ticks?: number
}

export type StateRefMap = {
  [key in StateRefKey]: StateRef
}

export default class Machine {

  states: Map<StateRefKey, State>
  current: StateRefKey
  
  constructor(refs: StateRefMap,
              current: StateRefKey) {

    this.states = new Map();
    
    for (let key in refs) {
      this.states.set(key,
                      this.makeState(refs[key]));
    }

    this.current = current;
    this.maybeState(this.current,
               _ => _.begin());
  }

  maybeState<A>(key: StateRefKey,
                op: (_: State) => A): A | undefined {
    let res = this.states.get(key);
    if (res) {
      return op(res);
    } else {
      console.warn('no state ', key);
    }
  }
  
  makeState(ref: StateRef) {
    let { hooks } = ref;
    return new State({
      begin: this.makeBegin(hooks.begin),
      update: this.makeUpdate(hooks.update),
      end: this.makeEnd(hooks.end, ref.next)
    }, ref.ticks);
  }

  makeBegin(begin?: HooksBegin) {
    return () => {
      begin?.();
    };
  }

  makeUpdate(update?: HooksUpdate) {
    return (t: number, ticks?: t.Ticks) => {
      update?.(t, ticks);
    };
  }

  makeEnd(end?: HooksEnd, next?: StateRefKey) {
    return () => {
      end?.();
      if (next) {
        this.transition(next);
      }
    };
  }

  transition(next: StateRefKey) {
    this.maybeState(this.current, _ => {
      _.cut();
    });
    this.current = next;
    this.maybeState(this.current, _ => {
      _.begin();
    });
  }

  update() {
    this.maybeState(this.current, _ => {
      _.update();
    });
  }

  
}
