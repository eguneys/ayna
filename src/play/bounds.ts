import Point from './point';

export const Tile = 8
export const Width = 320
export const Height = 160
export const Rows = Height / Tile
export const Cols = Width / Tile
export const RoomTileWidth = Width / 2
export const RoomTileHeight = Height / 2

export const TileSize: Point = Point.make(Tile, Tile);
export const ScreenSize: Point = Point.make(Width, Height);
export const HalfScreenSize: Point = ScreenSize.half;
