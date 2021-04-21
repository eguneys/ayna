export type NRange = [number, number];

// 10 20
// 0 1
export function mapRange(r: NRange,
                         r2: NRange) {
  let l1 = r[1] - r[0],
  l2 = r2[1] - r2[0];
  return (x: number) => {
    return r2[0] + (x - r[0]) / l1 * l2;
  };
}
