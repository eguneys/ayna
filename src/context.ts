import Audio from './audio';
import Draw from './draw';
import Input from './input';

export type Context = {
  audio: Audio,
  draw: Draw,
  input: Input
}

export abstract class Cus {

  context: Context

  get draw(): Draw { return this.context.draw }
  get input(): Input { return this.context.input }
  get audio(): Audio { return this.context.audio }

  constructor(context: Context) {
    this.context = context;
  }

  abstract update(dt: number): void
  abstract render(): void
  
}
