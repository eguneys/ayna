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

  camera(x: number = 0, y: number = 0) {
    x = Math.floor(x);
    y = Math.floor(y);
    
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(x, y);
  }

  style(style: string) {
    this.ctx.fillStyle = style;
  }

  strokeStyle(style: string) {
    this.ctx.strokeStyle = style;
  }

  stroke(x: number, y: number,
         w: number, h: number) {
    x = Math.floor(x);
    y = Math.floor(y);
    this.ctx.strokeRect(x, y, w, h);
  }
  
  rect(x: number, y: number,
       w: number, h: number) {
    this.ctx.fillRect(x, y, w, h);
  }

  s(sx: number, sy: number, 
    sWidth: number, sHeight: number,
    dx: number, dy: number,
    dWidth: number, dHeight: number, flipx: boolean = false) {

    dx = Math.floor(dx);
    dy = Math.floor(dy);

    this.ctx.save();
    
    if (flipx) {
      this.ctx.scale(-1, 1);
      dx *= -1;
      dx -= dWidth;
    }
    
    this.ctx.drawImage(this.image, 
                       sx, sy,
                       sWidth, sHeight,
                       dx, dy,
                       dWidth, dHeight);

    this.ctx.restore();
  }

  
}
