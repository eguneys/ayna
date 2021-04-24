import { Context, Cus } from '../context';
import Room from './room';

export default class Rooms extends Cus {

  room: Room
  
  constructor(context: Context) {
    super(context);
    this.room = new Room(context, level);
  }

  update() {
    this.room.update();
  }

  render() {

    this.draw.cls();

    this.room.render();
  }
  
}
