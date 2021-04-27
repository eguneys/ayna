import sprites8 from '../assets/sprites8.png';
import { loadImage } from './loadImage';
import { animate } from './animate';
import Draw from './draw';
import Input from './input';
import { Context } from './context';
import Canvas from './canvas';
import Play from './play';
import Audio from './audio';
import audioData from './audio/data';

export default function app(element: Element) {

  let audio = new Audio();

  Promise.all([loadImage(sprites8),
               audio.generate(audioData)])
    .then(([image, audio]) => {
      let canvas = new Canvas(element);
      let draw = new Draw(canvas.ctx, image);
      let input = new Input();
      input.bind();
      input.bindGamepad();

      let play = new Play({audio,
                           draw, 
                           input});
      animate(() => {
        play.update();
        input.update();
        play.render();
      });
      
    });

}
