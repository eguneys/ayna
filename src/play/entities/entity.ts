import Draw from '../../draw';
import { Rect } from '../rect';

export default class Entity {

  readonly dim: Rect
  readonly hitbox: Rect
  get ahitbox() {
    return {
      x: this.hitbox.x + this.x,
      y: this.hitbox.y + this.y,
      w: this.hitbox.w,
      h: this.hitbox.h
    };
  }
  get adim() {
    return {
      x: this.dim.x + this.x,
      y: this.dim.y + this.y,
      w: this.dim.w,
      h: this.dim.h
    };
  }
  x: number
  y: number
  
  constructor(dim: Rect,
              hitbox: Rect, x: number, y: number) {

    this.dim = dim;
    this.hitbox = hitbox;
    this.x = x;
    this.y = y;
  }

  moveX(dx: number) {
    this.x += dx;
  }

  render(draw: Draw) {
    draw.strokeStyle('green');
    draw.stroke(this.ahitbox.x,
                this.ahitbox.y,
                this.ahitbox.w,
                this.ahitbox.h);
  }
  
}
