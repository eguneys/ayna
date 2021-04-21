import Canvas from './canvas';

export default class Draw {

  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  
  constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
    this.ctx = ctx;
    this.image = image;
    this.ctx.imageSmoothingEnabled = false;
  }

  cls() {
    this.ctx.clearRect(0, 0, 320, 160);
  }

  style(style: string) {
    this.ctx.fillStyle = style;
  }

  strokeStyle(style: string) {
    this.ctx.strokeStyle = style;
  }

  stroke(x: number, y: number,
         w: number, h: number) {
    this.ctx.strokeRect(x, y, w, h);
  }
  
  rect(x: number, y: number,
       w: number, h: number) {
    this.ctx.fillRect(x, y, w, h);
  }

  s(sx: number, sy: number, 
    sWidth: number, sHeight: number,
    dx: number, dy: number,
    dWidth: number, dHeight: number) {
    
    this.ctx.drawImage(this.image, 
                       sx, sy,
                       sWidth, sHeight,
                       dx, dy,
                       dWidth, dHeight);
  }

  
}
