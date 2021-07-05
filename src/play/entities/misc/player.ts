import { InputKey } from '../../../input';
import { Context, Cus } from '../../../context';
import { Maker } from '../maker';
import { PlayerChar } from '../../chars';
import Entity from '../entity';
import Dynamic from '../dynamic';
import { CollideCheck } from '../collide';
import * as t from '../../ticks';
import * as bs from '../../bounds';
import Point from '../../point';
import Rect from '../../rect';
import Room from '../../room';
import Rooms from '../../rooms';
import DCus from '../dcus';
import PSfi from '../psfi';
import * as sf from '../sprites';
import Sfx from '../sfx';

// export default class Player extends DCus {

//   static maker: Maker<Player> = {
//     hitbox: Rect.make({ x: 0, y: -5, w: 8, h: 12 }),
//     dim: Rect.make({ x: -3, y: -10, w: 13, h: 18 }),
//     char: PlayerChar,
//     apply(context: Context,
//           collide: CollideCheck,
//           i: number, j: number) {

//       let entity = new Entity(collide,
//                               this.dim,
//                               this.hitbox,
//                               i, j);

//       return new Player(context, entity);
//     }
//   }
  
//   pause: boolean = false
  
//   get target(): Point {
//     return this.entity.ahitbox.xy.sub(bs.HalfScreenSize);
//   }

//   get origin(): Point {
//     return this.entity.ahitbox.origin;
//   }

//   restI: number = 0;
//   psfi: PSfi = new PSfi(Rect.make(sf.player.rest));
  
//   constructor(context: Context,
//               entity: Entity) {
//     super(context,
//           new Dynamic(entity));
//   }

//   update(dt: number) {
//     if (this.pause) {
//     } else {
//       super.update(dt);
//     }
//   }

//   render() {
//     this.dynamic.render(this.draw);
//     // this.entity.debug(this.draw)
//   }
// }
