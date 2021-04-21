import { Context, Cus } from '../../context';
import { Rect } from '../rect';
import Objects from '../objects';

export type Maker = {
  hitbox: Rect,
  dim: Rect,
  char: string,
  apply: (objects: Objects, i: number, j: number) => Cus
}
