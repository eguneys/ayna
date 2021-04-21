import { Context, Cus } from '../../context';
import Entity from './entity';
import Dynamic from './dynamic';

export default abstract class DCus extends Cus {
  entity: Entity
  dynamic: Dynamic

  constructor(context: Context,
              dynamic: Dynamic) {
    super(context);

    this.dynamic = dynamic;
    this.entity = dynamic.entity;
  }

  update() {
    this.dynamic.move();
  }
}
