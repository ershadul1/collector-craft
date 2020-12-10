import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Ershadul Hakim Rayhan', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    this.creditsText.setY(150);
    this.madeByText.setY(270);

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    //   this.creditsTween = this.tweens.add({
    //     targets: this.creditsText,
    //     y: -100,
    //     ease: 'Power1',
    //     duration: 3000,
    //     delay: 1000,
    //     onComplete() {
    //       this.destroy;
    //     },
    //   });

  //   this.madeByTween = this.tweens.add({
  //     targets: this.madeByText,
  //     y: -300,
  //     ease: 'Power1',
  //     duration: 8000,
  //     delay: 1000,
  //     onComplete: function () {
  //       this.madeByTween.destroy;
  //       this.scene.start('Title');
  //     }.bind(this),
  //   });
  // }
  }
}