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
    let x = Math.floor(rect.x / this.cellW),
    y = Math.floor(rect.y / this.cellH),
    w = Math.floor(rect.w / this.cellW) + 1,
    h = Math.floor(rect.h / this.cellH) + 1;

    return this.checkRect(x, y, w, h);
  }

  checkRect(x: number, y: number,
            w: number, h: number) {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        if (this.data.get(x + i, y + j)) {
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
