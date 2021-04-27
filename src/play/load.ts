import { RoomsCharMap, LevelDef, RoomDef } from './editor';
import Point from './point';
import Rect from './rect';

export function level(level: LevelDef, chars: RoomsCharMap<RoomDef>) {
  let pMap: RoomsCharMap<Array<Point>> = {};
  let ns = level.split('\n');
  ns.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x]) {
        if (chars[line[x]]) {
          if (!pMap[line[x]]) {
            pMap[line[x]] = [];
          }
          pMap[line[x]].push(Point.make(x, y));
        }
      }
    }
  });
  let res: Array<[RoomDef, Rect]> = [];
  for (let char in pMap) {
    let rd = chars[char];
    let r = Rect.fromPoints(pMap[char]);
    res.push([rd, r]);
  }
  return res;
}

export function room(room: RoomDef) {
  return (char: string) => {
    let res: Array<Point> = [];
    let ns = room.split('\n');
    ns.forEach((line, y) => {
      for (let x = 0; x < line.length; x++) {
        if (line[x] && line[x] === char) {
          res.push(Point.make(x, y));
        }
      }
    });
    return res;
  };
}
