import sprites8 from '../assets/sprites8.png';
import { loadImage } from './loadImage';
import { animate } from './animate';
import Draw from './draw';
import Input from './input';
import { Context } from './context';
import Canvas from './canvas';
import Play from './play';

export default function app(element: Element) {

  loadImage(sprites8).then((image: HTMLImageElement) => {
    let canvas = new Canvas(element);
    let draw = new Draw(canvas.ctx, image);
    let input = new Input();
    input.bind();
    input.bindGamepad();

    let play = new Play({draw, 
                         input});
    animate(() => {
      play.update();
      input.update();
      play.render();
    });

  });

  

}
