export type LevelDef = string
export type RoomDef = string

export type RoomsCharMap<A> = {
  [key in string]: A
}

export * as home from './home';
