export type Level = string;

export function callChar(level: Level) {
  return <A>(char: string, cb: (i: number, j: number) => A) => {
    let res: Array<A> = [];
    let ns = level.split('\n');
    ns.forEach((line, y) => {
      for (let x = 0; x < line.length; x++) {
        if (line[x] && line[x] === char) {
          res.push(cb(x, y));
        }
      }
    });
    return res;
  };
}
