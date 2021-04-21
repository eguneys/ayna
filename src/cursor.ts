import { InputKey, default as Input } from './input';
import { Context } from './context';
import Tile from './tile';
import { mv, madd, mneg } from './matrix';

export default class Cursor extends Tile {
  
  constructor(context: Context, pos: Vec) {
    super(context, pos, [0, 0, 0]);
  }

  update() {
    super.update();
    if (this.input.btn(InputKey.Left) % 8 === 1) {
      madd(this.pos, mv(this.ntrans, [-1, 1, 0]));
    } else if (this.input.btn(InputKey.Right) % 8 === 1) {
      madd(this.pos, mv(this.ntrans, [1,-1,0]));
    } else if (this.input.btn(InputKey.Up) % 8 === 1) {
      madd(this.pos, mv(this.ntrans, [-1,-1,0]));
    } else if (this.input.btn(InputKey.Down) % 8 === 1) {
      madd(this.pos, mv(this.ntrans, [1,1,0]));
    }
  }

}
