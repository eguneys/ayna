import { Context, Cus } from '../../context';
import { Rect } from '../rect';
import Room from '../room';

export type Maker = {
  hitbox: Rect,
  dim: Rect,
  char: string,
  apply: (room: Room, i: number, j: number) => Cus
}
