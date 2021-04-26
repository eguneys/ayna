import Rect from '../rect';

export type CollideCheck = (_: Rect) => boolean
export const noCollision: CollideCheck = (_) => false;
