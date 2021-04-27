import Rect from '../rect';
import Point from '../point';
import { Sfi } from './sfi';

export default class PSfi {

  sfi?: Sfi

  set sf(r: Rect) {
    if (!this.sfi) {
      this.sfi = [r, Point.zero];
    } else {
      this.sfi[0] = r;
    }
  }
  
  set si(i: number) {
    let p = Point.make(Math.floor(i * 3), 0);
    if (this.sfi) {
      this.sfi[1] = p;
    }
  }

  constructor(sf?: Rect) {
    if (sf) {
      this.sf = sf;
    }
  }
  

}
