import imageOsi from '../assets/osi.png';
import { loadImage } from './loadImage';
import Canvas from './canvas';

export default function app(element: Element) {

  loadImage(imageOsi).then(assets => {
    console.log(assets);
    let canvas = new Canvas(element);
  });

  

}
