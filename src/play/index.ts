import { Context, Cus } from '../context';
import Objects from './objects';

let level = `













        SSSS

SSSSS   
S     SSSS
S             S     @    S
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS`;

export default class Play extends Cus {

  objects: Objects
  
  constructor(context: Context) {
    super(context);
    this.objects = new Objects(context, level);
  }

  update() {
    this.objects.update();
  }

  render() {

    this.draw.cls();

    this.objects.render();
    
  }
  
}
