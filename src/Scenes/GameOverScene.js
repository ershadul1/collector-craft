import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('Over');
  }

  

  create() {
    this.gameOverText = this.add.text(0, 0, 'Game Over', { fontSize: '32px', fill: '#fff' });
    this.enterNameText = this.add.text(0, 0, 'Enter your name to save your score', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.gameOverText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.enterNameText,
      this.zone,
    );

    this.gameOverText.setY(150);
    this.enterNameText.setY(240);


    var inputText = this.add.rexInputText(100, 300, 100, 50, config);
    inputText.setStyle(backgroundColor, 'EEAABB')

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
}
}