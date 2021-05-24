export default interface Audio {
  initAfterUserInteraction(): void;
  sfx(name: number, volume?: number): void;
}

export class NoAudio implements Audio {

  static instance: NoAudio = new NoAudio();
  
  initAfterUserInteraction() {}
  sfx(name: number, volume?: number) {}
}
