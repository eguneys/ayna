export default class VMap<A> {

  segments: Array<Array<A>>

  get w(): number {
    return this.segments.length;
  }

  get h(): number {
    return this.segments.reduce((max, _) =>
      Math.max(max, _.length), 0);
  }
  
  constructor() {
    this.segments = [];
  }

  get(i: number, j: number, v?: A) {
    if (v !== undefined) {
      if (!this.segments[i]) {
        this.segments[i] = [];
      }
      this.segments[i][j] = v;
      return v;
    } else {
      if (this.segments[i]) {
        return this.segments[i][j];
      }
    }
  }
  
}
