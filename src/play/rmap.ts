import DQuad from './dquad';
import Rect from './rect';

export default class RMap<A> {

  dquad: DQuad<A>
  
  cellW: number
  cellH: number
  
  constructor(cellW: number,
              cellH: number) {

    this.dquad = new DQuad<A>()
    this.cellW = cellW;
    this.cellH = cellH;
  }

  add(rect: Rect, a: A) {
    this.dquad.add(rect, a);
  }

  collide(rect: Rect) {
    return this.dquad.checkAny(rect.div(this.cellW, this.cellH));
  }
  
}
