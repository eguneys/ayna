import * as bs from './bounds';
import Rect from './rect';
import Point from './point';

export default class Camera {

  _target?: Point
  frustum: Rect
  lock?: Rect

  willLock?: Rect
  iWillLock: number = 0;

  get target(): Maybe<Point> {
    return this._target;
  }

  set target(_: Maybe<Point>) {
    if (!this._target || !_ || this._target.dist(_) > bs.Tile) {
      this._target = _;
    }
  }

  get lockedFrustum() {
    if (this.lock) {
      if (this.willLock) {
        let previousLock = this.frustum.lock(this.lock),
        nextLock = this.frustum.lock(this.willLock);
        return previousLock.i(this.iWillLock, nextLock);
      } else {
        return this.frustum.lock(this.lock);
      }
    } else {
      return this.frustum;
    }
  }  
  
  constructor() {

    this.frustum = Rect.make({
      x: 0,
      y: 0,
      w: bs.Width,
      h: bs.Height
    });
  }

  endLock() {
    this.iWillLock = 0;
    this.lock = this.willLock;
    this.willLock = undefined;
  }

  worldCameraOffset(x: number, y: number) {
    return Point.make(x, y).sub(this.lockedFrustum.xy);
  }

  update() {

    if (this.target) {
      this.frustum = this.frustum.approach(this.target, 0.1, bs.Tile);
    }

    //this.frustum = this.lockedFrustum;
    
  }
  
}
