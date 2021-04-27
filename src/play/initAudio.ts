import Audio from '../audio';

export default class InitAudio {

  audio: Audio
  interacted: boolean = false
  
  constructor(audio: Audio) {
    this.audio = audio;
  }

  request() {
    if (!this.interacted) {
      this.interacted = true;
      this.audio.initAfterUserInteraction();
    }
  }
}
