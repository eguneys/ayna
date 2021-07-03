import { Context, Cus } from '../context';
import Point from './point';
import Rect from './rect';
import Grid from './grid';
import * as cs from './chars';
import * as bs from './bounds';
import entities from './entities';
import { SolidChar, PlayerChar } from './chars';
import { RoomDef } from './editor';
import { room, roomSize } from './load';

export default class Room extends Cus {

  grid: Grid
  checkpoints: Array<Point>
  
  constructor(context: Context) {
    super(context);

    this.grid = new Grid(bs.Tile, bs.Tile);
    this.checkpoints = [];
  }

  load(rd: RoomDef, index: number) {

    let cc = room(rd);

    cc(SolidChar).forEach((p) => {
      this.grid.get(p.i, p.j, true);
    });

    cc(PlayerChar).forEach(p => {
      this.checkpoints.push(p.mul(bs.TileSize));
    });

    // for (let maker of entities) {
    //   cc(maker.char).forEach(([i, j]) => {
    //     let entity = maker.apply(this, i * 8, j * 8);

    //     this.objects.push(entity);
    //   });
    // }

  }

  update() {
  }

  render() {
    this.grid.render(this.draw);
  }
}
  
