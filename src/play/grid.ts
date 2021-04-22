import Draw from '../draw';
import VMap from './vmap';
import {Rect} from './rect';
import { SolidChar } from './chars';
import { Level } from './level';

export default class Grid {

  cellW: number
  cellH: number
  data: VMap<boolean>

  constructor(cellW: number,
              cellH: number,
              data: Level) {

    this.cellW = cellW;
    this.cellH = cellH;

    let ns = data.split('\n');
    let longestX = ns.reduce((acc, _) =>
      Math.max(acc, _.length), 0);
    
    this.data = new VMap(longestX,
                         ns.length,
                         false);
    this.loadBitstring(data);
  }

  loadBitstring(data: string) {
    let ns = data.split('\n');
    ns.forEach((line, y) => {
      for (let x = 0; x < this.data.w; x++) {
        if (line[x] && line[x] === SolidChar) {
          this.data.get(x, y, true);
        } else {
          this.data.get(x, y, false);
        }
      }
    });
  }

  collide(rect: Rect) {
    let x = Math.floor(rect.x / this.cellW),
    y = Math.floor(rect.y / this.cellH),
    w = Math.floor(rect.w / this.cellW) + 1,
    h = Math.floor(rect.h / this.cellH) + 1;
    return this.checkRect(x, y, w, h);
  }

  checkRect(x: number, y: number, w: number, h: number) {
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
