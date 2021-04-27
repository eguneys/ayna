export function aRand<A>(arr: Array<A>): A {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const walks = [
  1,2,3,4
];

export const walkRandom = () => aRand<number>(walks);
