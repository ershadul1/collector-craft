export default class Model {
  constructor() {
    this.val_soundOn = true;
    this.val_musicOn = true;
    this.val_bgMusicPlaying = false;
  }

  set musicOn(value) {
    this.val_musicOn = value;
  }

  get musicOn() {
    return this.val_musicOn;
  }

  set soundOn(value) {
    this.val_soundOn = value;
  }

  get soundOn() {
    return this.val_soundOn;
  }

  set bgMusicPlaying(value) {
    this.val_bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.val_bgMusicPlaying;
  }
}
