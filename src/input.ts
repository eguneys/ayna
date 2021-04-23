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

export type InputMap<A> = {
  [key in InputKey]?: A
}

export const ReleaseRange: NRange = [-10, 0];

export default class Input {

  inputs: InputMap<InputState>
  gamepadPressed: InputMap<boolean>

  constructor() {
    this.inputs = {};
    this.gamepadPressed = {};
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
    this.updateGamepad();
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

  upGamepad(key: InputKey) {
    if (this.gamepadPressed[key]) {
      this.gamepadPressed[key] = false;
      this.up(key);
    }
  }

  downGamepad(key: InputKey) {
    if (!this.gamepadPressed[key]) {
      this.gamepadPressed[key] = true;
      this.down(key);
    }    
  }

  updateGamepad() {

    let gamepad = navigator.getGamepads()[0];

    if (gamepad) {
      if (gamepad.axes[0] === 1) {
        this.downGamepad(InputKey.Right);
      } else if (gamepad.axes[0] === -1) {
        this.downGamepad(InputKey.Left);
      } else {
        this.upGamepad(InputKey.Left);
        this.upGamepad(InputKey.Right);        
      }

      if (gamepad.axes[1] === 1) {
        this.downGamepad(InputKey.Down);
      } else if (gamepad.axes[1] === -1) {
        this.downGamepad(InputKey.Up);
      } else {
        this.upGamepad(InputKey.Down);
        this.upGamepad(InputKey.Up);
      }

      if (gamepad.buttons[2].pressed) {
        this.downGamepad(InputKey.X)
      } else {
        this.upGamepad(InputKey.X);
      }
    }


  }

  bindGamepad() {
    window.addEventListener('gamepadconnected', e => {
    });
  }

}
