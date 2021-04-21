export function madd(vec: Vec, v2: Vec) {
  vec[0] += v2[0];
  vec[1] += v2[1];
  vec[2] += v2[2];
}

export function mv(trans: Mat, vec: Vec): Vec {
  return [
    mdot(trans[0], vec),
    mdot(trans[1], vec),
    mdot(trans[2], vec)
  ];
}

export function mdot(v: Vec, v2: Vec): number {
  return v[0] * v2[0] + 
    v[1] * v2[1] +
    v[2] * v2[2];
}

export function mmul(m1: Mat, m2: Mat): Mat {
  return m1.map<Vec>(mr =>
    [mdot(mr, [m2[0][0],
               m2[1][0],
               m2[2][0]]),
     mdot(mr, [m2[0][1],
               m2[1][1],
               m2[2][1]]),
     mdot(mr, [m2[0][2],
               m2[1][2],
               m2[2][2]])]) as Mat;
}

export function mneg(m: Mat): Mat {
  return [
    [m[0][0] * -1, m[0][1] * -1, m[0][2]],
    [m[1][0] * -1, m[1][1] * -1, m[1][2]],
    [m[2][0] * -1, m[2][1] * -1, m[2][2]],
  ] as Mat;
}

export const mnegrotate: Mat = [
  [0,1,0],
  [-1,0,0],
  [0,0,1]
];

export const mrotate: Mat = [
  [0,-1,0],
  [1,0,0],
  [0,0,1]
];

export const mid: Mat = [
  [1,0,0],
  [0,1,0],
  [0,0,1]
]
