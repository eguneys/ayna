export default class IPol {

  static make = (i: number) => new IPol(i);

  i: number
  
  constructor(i: number) {
    this.i = i;
  }
  
}
