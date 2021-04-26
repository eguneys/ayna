import { Context, Cus } from '../../context';
import DCus from './dcus';
import Rect from '../rect';
import Room from '../room';
import { CollideCheck } from './collide';

export type Maker<A extends DCus> = {
  hitbox: Rect,
  dim: Rect,
  char: string,
  apply: (context: Context,
          collide: CollideCheck,
          i: number,
          j: number) => A
}
