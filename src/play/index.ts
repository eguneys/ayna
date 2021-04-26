import { Context, Cus } from '../context';
import Rooms from './rooms';
import { home } from './editor';

export default class Play extends Cus {

  rooms: Rooms
  
  constructor(context: Context) {
    super(context);

    this.rooms = new Rooms(context);

    this.rooms.load(home.level, home.chars);
    
  }

  update() {
    this.draw.camera();
    this.draw.cls();
    
    this.rooms.update();
  }

  render() {
    this.rooms.render();
  }
  
}
