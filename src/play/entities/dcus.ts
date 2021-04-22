import { Context, Cus } from '../../context';
import Entity from './entity';
import Dynamic from './dynamic';
import Objects from '../objects';

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
  
  get grid() {
    return this.dynamic.grid;
  }
  
  get entity() {
    return this.dynamic.entity;
  }

  get grounded() {
    return this.entity.grounded;
  }

  constructor(base: Objects,
              dynamic: Dynamic) {
    super(base.context);

    this.dynamic = dynamic;
  }

  update() {
    this.dynamic.move();
  }
}
