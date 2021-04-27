export type n = number;

export type EasingFunc = (_: number) => number

export type EasingFunctions = {
  [key: string]: EasingFunc
}

const all: EasingFunctions = {
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  // accelerating from zero velocity 
  easeInCubic: t => t*t*t,
}

export default all;
