import Draw from '../draw';
import Rect from './rect';
import VMap from './vmap';
import { SolidChar } from './chars';
import { RoomDef } from './editor';

export default class Grid {

  cellW: number
  cellH: number
  data: VMap<boolean>

  get w() { return this.data.w * this.cellW; }
  get h() { return this.data.h * this.cellH; }
  
  constructor(cellW: number,
              cellH: number) {

    this.cellW = cellW;
    this.cellH = cellH;

    this.data = new VMap();
    
  }

  get(i: number, j: number, v?: boolean) {
    return this.data.get(i, j, v);
  }

  collide(rect: Rect) {
    let l = Math.floor(rect.left / this.cellW),
    t = Math.floor(rect.top / this.cellH),
    r = Math.floor(rect.right / this.cellW),
    b = Math.floor(rect.bottom / this.cellH);

    return this.checkRect(l, t, r, b);
  }

  checkRect(l: number, t: number,
            r: number, b: number) {
    for (let i = l; i <= r; i++) {
      for (let j = t; j <= b; j++) {
        if (this.data.get(i, j)) {
          return true;
        }
      }
    }
    return false;
  }

  render(draw: Draw) {
    draw.strokeStyle('red');
    for (let i = 0; i < this.data.w; i++) {
      for (let j = 0; j < this.data.h; j++) {
        if (this.data.get(i, j)) {
          draw.stroke(i * this.cellW,
                    j * this.cellH,
                    this.cellW,
                    this.cellH);
        }
      }
    }
  }
  
}
