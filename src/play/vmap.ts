export default class VMap<A> {

  w: number
  h: number
  segments: Array<A>
  defaultA: A
  
  constructor(w: number,
              h: number,
              defaultA: A) {

    this.w = w;
    this.h = h;
    this.defaultA = defaultA;
    this.segments = [];    
  }

  get(i: number, j: number, v?: A) {
    if (v !== undefined) {
      this.segments[i + j * this.w] = v;
      return v;
    } else {
      return this.segments[i + j * this.w];
    }
  }
  
}
