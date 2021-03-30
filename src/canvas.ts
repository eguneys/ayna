export default class Canvas {

  ctx!: CanvasRenderingContext2D
  
  constructor(element: Element) {

    let $c = document.createElement('canvas');

    $c.width = 320;
    $c.height = 160;

    let ctx = $c.getContext('2d');

    if (!ctx) {
      throw 'No 2d context';
    } else {
      this.ctx = ctx;
    }

    element.appendChild($c);
  }

}
