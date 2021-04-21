import Draw from './draw';
import Input from './input';

export type Context = {
  draw: Draw,
  input: Input
}

export abstract class Cus {

  context: Context
  draw: Draw
  input: Input

  constructor(context: Context) {
    this.context = context;
    this.draw = context.draw;
    this.input = context.input;
  }

  abstract update(): void
  abstract render(): void
  
}
