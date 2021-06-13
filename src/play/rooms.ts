import { Context, Cus } from '../context';
import { RoomsCharMap, LevelDef, RoomDef } from './editor';
import * as bs from './bounds';
import Rect from './rect';
import Point from './point';
import DQuad from './dquad';
import Player from './entities/player';
import { CollideCheck } from './entities/collide';
import Room from './room';
import { level } from './load';
import Camera from './camera';
import RoomTransition from './roomtransition';

export default class Rooms extends Cus {

  rev: Map<Room, Rect>
  dquad: DQuad<Room>
  camera: Camera
  transition: RoomTransition
  activeRoom!: Room
  player!: Player

  get visible(): Array<Room> {
    let { frustum } = this.camera;
    return this.dquad.check(frustum);
  }

  get activeRect(): Rect {
    return this.rev.get(this.activeRoom)!;
  }

  get playerTransitionRoom(): Room | undefined {
    return this.dquad.checkPoint(this.playerOrigin);
  }

  get willTransitionToRoom(): Room | undefined {
    let troom = this.playerTransitionRoom;
    if (troom !== this.activeRoom) {
      return troom;
    }
  }

  get playerTarget(): Point {
    return this.activeRect.translate(this.player.target.x,
                                     this.player.target.y).xy;
  }

  get playerOrigin(): Point {
    return this.activeRect.translate(this.player.origin.x,
                                     this.player.origin.y).xy;
  }
  
  constructor(context: Context) {
    super(context);

    this.camera = new Camera();
    this.dquad = new DQuad<Room>();
    this.rev = new Map<Room, Rect>();

    this.transition = new RoomTransition(this.camera,
                                         this.onTransitionBegin.bind(this),
                                         this.onTransitionEnd.bind(this));

  }

  onTransitionBegin() {
    this.player.pause = true;
  }
  
  onTransitionEnd() {
    if (this.willTransitionToRoom) {
      this.player.pause = false;
      let oldActiveRect = this.activeRect;
      this.activeRoom = this.willTransitionToRoom;
      let newActiveRect = this.activeRect;

      let tDiff = oldActiveRect.xy.sub(newActiveRect.xy);

      this.player.entity.moveX(tDiff.x);
      this.player.entity.moveY(tDiff.y);
    }
  }

  load(ld: LevelDef, chars: RoomsCharMap<RoomDef>) {

    level(ld, chars).map(([rd, r]) => {
      let rect = r.mul(bs.RoomTileWidth, bs.RoomTileHeight);
      let room = new Room(this.context)

      room.load(rd);
      
      this.dquad.add(rect, room);
      this.rev.set(room, rect);

      this.activeRoom = room;
    });

    let localSpawnPos = this.activeRoom.checkpoints[0];
    const playerCollide: CollideCheck = _ =>
      this.activeRoom.grid
        .collide(_) ||
      !this.playerTransitionRoom;
    
    this.player = Player.maker.apply(
      this.context,
      playerCollide,
      localSpawnPos.x,
      localSpawnPos.y);

    this.camera.lock = this.activeRect;
  }

  update() {
    this.player.update();

    this.camera.target = this.playerTarget;

    this.camera.update();
    this.transition.update();    

    let troom = this.willTransitionToRoom;
    if (troom) {
      this.transition.request(this.rev.get(troom)!);
    }
  }

  worldCameraOffset(x: number, y: number) {
    let off = this.camera.worldCameraOffset(x, y);    
    this.draw.camera(off.x, off.y);
  }
  
  render() {
    this.visible.forEach(_ => {
      let rect = this.rev.get(_)!;
      this.worldCameraOffset(rect.x, rect.y);
      _.render()
    });

    this.worldCameraOffset(this.activeRect.x,
                           this.activeRect.y);
    this.player.render();
  }
  
}
