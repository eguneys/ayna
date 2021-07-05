import { Context, Cus } from '../../context';
import Entity from './entity';
import Dynamic from './dynamic';

export default abstract class DCus extends Cus {
  dynamic: Dynamic

  get dx() {
    return this.dynamic.dx;
  }

  set dx(v: number) {
    this.dynamic.dx = v;
  }

  get dy() {
    return this.dynamic.dy;
  }

  set dy(v: number) {
    this.dynamic.dy = v;
  }
  
  get entity() {
    return this.dynamic.entity;
  }

  get ahitbox() {
    return this.entity.ahitbox;
  }

  get grounded() {
    return this.entity.grounded;
  }

  constructor(context: Context,
              dynamic: Dynamic) {
    super(context);

    this.dynamic = dynamic;
  }

  update(dt: number) {
    this.dynamic.move(dt);
  }
}
