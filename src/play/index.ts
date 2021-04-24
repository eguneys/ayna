import { Context, Cus } from '../context';
import Rooms from './rooms';

export default class Play extends Cus {

  rooms: Rooms
  
  constructor(context: Context) {
    super(context);

    this.rooms = new Rooms(context);
    
  }

  update() {
    this.rooms.update();
  }

  render() {
    this.rooms.render();
  }
  
}
