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

  private up(key: InputKey) {
    let s = this.inputs[key];
    if (s) {
      s.btn = -10;
    }
  }

  private down(key: InputKey) {
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
    this.updateG();
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
        case 'KeyC':
          this.up(InputKey.C);
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
        case 'KeyC':
          this.down(InputKey.C);
          break;
      }
    });
  }

  upG(key: InputKey) {
    if (this.gamepadPressed[key]) {
      this.gamepadPressed[key] = false;
      this.up(key);
    }
  }

  downG(key: InputKey) {
    if (!this.gamepadPressed[key]) {
      this.gamepadPressed[key] = true;
      this.down(key);
    }    
  }

  updateG() {

    let gamepad = navigator.getGamepads()[0];

    if (gamepad) {
      if (gamepad.axes[0] === 1) {
        this.downG(InputKey.Right);
      } else if (gamepad.axes[0] === -1) {
        this.downG(InputKey.Left);
      } else {
        this.upG(InputKey.Left);
        this.upG(InputKey.Right);        
      }

      if (gamepad.axes[1] === 1) {
        this.downG(InputKey.Down);
      } else if (gamepad.axes[1] === -1) {
        this.downG(InputKey.Up);
      } else {
        this.upG(InputKey.Down);
        this.upG(InputKey.Up);
      }

      if (gamepad.buttons[2].pressed) {
        this.downG(InputKey.X)
      } else {
        this.upG(InputKey.X);
      }
      if (gamepad.buttons[0].pressed) {
        this.downG(InputKey.C)
      } else {
        this.upG(InputKey.C);
      }
    }


  }

  bindGamepad() {
    // window.addEventListener('gamepadconnected', e => {
    // });
  }

}
