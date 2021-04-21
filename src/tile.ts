import { InputKey, default as Input } from './input';
import { Context, Cus } from './context';
import { mv, mid, mrotate, mmul, mnegrotate } from './matrix';

const rotates = [mid, mrotate];
const nrotates = [mid, mnegrotate];

export default class Tile extends Cus {

  s: Vec
  pos: Vec
  trans: Mat
  ntrans: Mat

  constructor(context: Context, pos: Vec, s: Vec) {
    super(context);
    this.trans = mid;
    this.ntrans = mid;
    this.pos = pos;
    this.s = s;
  }

  update() {
    let ix = this.input.btn(InputKey.X);
    let i = Math.floor(ix / 8) % 2;
    if (ix % 8 === 1) {
      this.trans = rotates[i];
      this.ntrans = nrotates[i];
    }
  }

  render() {
    let [i,j,k] = mv(this.trans, this.pos);
    this.draw.s(this.s[0], this.s[1], 16, 16, 160 + i * 8 - j * 8, 80 + i * 4 + j * 4 - k * 8, 16, 16);
  }

}
