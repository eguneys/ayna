import Audio from './audio';
import CPlayer from './audio/player-small';

export default class Bfx implements Audio {

  ctx!: AudioContext
  audioMaster!: GainNode

  waves: any
  sounds: any
  
  constructor() {
    this.waves = {};
    this.sounds = {};
  }

  generate(data: Array<any>) {
    data.forEach((o, i) => {
      let generator: any = new (CPlayer as any)();
      generator.init(o);
      const step = () => {
        if (generator.generate() === 1) {
          let wave = generator.createWave().buffer;
          this.waves[i] = wave;
        } else {      
          setTimeout(step, 0);
        }
      }
      step();
    });

    return new Promise<Audio>(resolve => {
      const check = () => {
        if (Object.keys(this.waves).length === data.length) {
          resolve(this);
          return;
        }
        setTimeout(check, 100);
      }
      check();
    });
  };

  initAfterUserInteraction() {
    this.ctx = new AudioContext()
    this.audioMaster = this.ctx.createGain();

    this.audioMaster.connect(this.ctx.destination);

    for (let name in this.waves) {
      this.ctx.decodeAudioData(this.waves[name], buffer => {
        this.sounds[name] = buffer;
      })
    }
  }
  

  sfx(name: number, volume = .5, playbackRate = 1, pan = 0, loop = false) {
    const buffer = this.sounds[name];

    if (!buffer) {
      return null;
    }

    let source = this.ctx.createBufferSource(),
        gainNode = this.ctx.createGain(),
        panNode = this.ctx.createStereoPanner();

    source.buffer = buffer;
    source.connect(panNode);
    panNode.connect(gainNode);
    gainNode.connect(this.audioMaster);

    source.playbackRate.value = playbackRate;
    source.loop = loop;
    gainNode.gain.value = volume;
    panNode.pan.value = pan;
    source.start();
    return {
      volume: gainNode,
      sound: source
    };
  };
}
