import { InputKey } from '../input';
import { Context, Cus } from '../context';
import Rooms from './rooms';
import { home } from './editor';
import InitAudio from './initAudio';

export default class Play extends Cus {

  initAudio: InitAudio
  rooms: Rooms
  
  constructor(context: Context) {
    super(context);

    this.initAudio = new InitAudio(this.audio);
    
    this.rooms = new Rooms(context);

    this.rooms.load(home.level, home.chars);

    
    
  }

  update() {

    let xLeft = this.input.btn(InputKey.Left),
    xRight = this.input.btn(InputKey.Right),
    yUp = this.input.btn(InputKey.Up),
    yDown = this.input.btn(InputKey.Down),
    btnX = this.input.btn(InputKey.X),
    btnC = this.input.btn(InputKey.C);

    if (xLeft > 0 ||
      xRight > 0 ||
      yUp > 0 ||
      yDown > 0 ||
      btnX > 0 ||
      btnC > 0) {
      this.initAudio.request();
    } 
    
    this.rooms.update();
  }

  render() {
    this.draw.camera();
    this.draw.cls();
    
    this.rooms.render();
  }
  
}
