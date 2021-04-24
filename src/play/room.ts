import { Context, Cus } from '../context';
import Grid from './grid';
import { Level, callChar } from './level';
import * as cs from './chars';
import entities from './entities';

export default class Room extends Cus {

  grid: Grid
  objects: Array<Cus>
  
  constructor(context: Context, level: Level) {
    super(context);
    
    this.grid = new Grid(8, 8, level);

    this.objects = [];
    
    let cc = callChar(level);

    for (let maker of entities) {
      cc(maker.char, (i, j) => {
        let entity = maker.apply(this, i * 8, j * 8);

        this.objects.push(entity);
      });
    }

  }

  update() {
    this.objects.forEach(_ => _.update());
  }

  render() {
    this.grid.render(this.draw);
    this.objects.forEach(_ => _.render());
  }
  
}
