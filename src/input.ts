import { NRange } from './range';

export enum InputKey {
  Left = 0,
  Right,
  Up,
  Down,
  X,
  C
}

const inputKeys = [
  InputKey.Left,
  InputKey.Right,
  InputKey.Up,
  InputKey.Down,
  InputKey.X,
  InputKey.C
]

export type InputState = {
  btn: number
}

export type InputMap = {
  [key in InputKey]?: InputState
}

export const ReleaseRange: NRange = [-10, 0];

export default class Input {

  inputs: InputMap

  constructor() {
    this.inputs = {}
  }

  btn(key: InputKey) {
    return this.inputs[key]?.btn||0;
  }

  up(key: InputKey) {
    let s = this.inputs[key];
    if (s) {
      s.btn = -10;
    }
  }

  down(key: InputKey) {
    let s = this.inputs[key];
    if (s) {
      if (s.btn > 0) {
      } else {
        s.btn = 1;
      }
    } else {
      this.inputs[key] = {
        btn: 1
      }
    }
  }

  update() {
    for (let key of inputKeys) {
      let input = this.inputs[key];
      if (input) {
        if (input.btn !== 0) {
          input.btn++;
        }
      }
    }
  }

  bind() {
    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.up(InputKey.Up);
          break;
        case 'ArrowDown':
          this.up(InputKey.Down);
          break;
        case 'ArrowLeft':
          this.up(InputKey.Left);
          break;
        case 'ArrowRight':
          this.up(InputKey.Right);
          break;
        case 'KeyX':
          this.up(InputKey.X);
          break;
      }
    });

    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.down(InputKey.Up);
          break;
        case 'ArrowDown':
          this.down(InputKey.Down);
          break;
        case 'ArrowLeft':
          this.down(InputKey.Left);
          break;
        case 'ArrowRight':
          this.down(InputKey.Right);
          break;
        case 'KeyX':
          this.down(InputKey.X);
          break;
      }
    });
  }

}
