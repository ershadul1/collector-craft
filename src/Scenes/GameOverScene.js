import Phaser from 'phaser';
import config from '../Config/config';
import gameState from '../game-state/gameState';
import resetGame from '../helpers/resetGameState';
import submitScore from '../helpers/submitScore';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('Over');
  }


  create() {
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    if (gameState.coins === 10) {
      this.winText = this.add.text(0, 0, 'Congratulations! you have collected all 10 coins', { fontSize: '22px', fill: '#fff' });
      this.winText.setY(100);
      Phaser.Display.Align.In.Center(
        this.winText,
        this.zone,
      );
    } else {
      this.winText = this.add.text(0, 0, 'Sorry! you could not collect all 10 coins', { fontSize: '22px', fill: '#fff' });
      this.winText.setY(100);
      Phaser.Display.Align.In.Center(
        this.winText,
        this.zone,
      );
    }


    this.gameOverText = this.add.text(0, 0, 'Game Over', { fontSize: '32px', fill: '#fff' });
    this.scoreText = this.add.text(0, 0, `You scored: ${gameState.score}`, { fontSize: '26px', fill: '#fff' });
    this.enterNameText = this.add.text(0, 0, 'Enter your name to save your score', { fontSize: '26px', fill: '#fff' });

    Phaser.Display.Align.In.Center(
      this.gameOverText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.enterNameText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.scoreText,
      this.zone,
    );

    this.gameOverText.setY(150);
    this.scoreText.setY(200);
    this.enterNameText.setY(240);

    this.add.dom(300, 380, 'input', 'background-color: white; width: 220px; height: 50px; font: 22px Arial');

    this.add.dom(500, 380, 'button', 'background-color: lightgreen; width: 120px; height: 50px; font: 22px Arial', 'submit');
    const submitBtn = document.querySelector('button');

    submitBtn.onclick = () => {
      const name = document.querySelector('input').value;
      submitScore(name, gameState.score);
      resetGame();
      this.scene.switch('Title');
    };
  }
}