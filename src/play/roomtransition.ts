import * as t from './ticks';
import Rect from './rect';
import Machine from './entities/machine';
import Camera from './camera';

export default class RoomTransition {

  machine: Machine;
  camera: Camera;

  constructor(camera: Camera,
              onTransitionBegin: () => void,
              onTransitionEnd: () => void) {
    this.camera = camera;

    this.machine = new Machine({
      rest: {
        hooks: {
          begin: this.restBegin.bind(this),
        }
      },
      transition: {
        hooks: {
          begin: onTransitionBegin,
          update: this.transitionUpdate.bind(this),
          end: onTransitionEnd
        },
        ticks: t.third,
        next: 'rest'
      }
    }, 'rest');

  }

  request(rect: Rect) {
    if (this.machine.current === 'rest') {
      this.camera.willLock = rect;
      this.machine.transition('transition');
    }
  }

  restBegin() {
    this.camera.endLock();
  }

  transitionUpdate(i: number) {
    this.camera.iWillLock = i;
  }

  update(dt: number) {
    this.machine.update(dt);
  }
  
}
