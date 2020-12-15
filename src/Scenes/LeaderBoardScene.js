import Phaser from 'phaser';
import getLeaderBoard from '../helpers/getLeaderBoard';
import config from '../Config/config';
import Button from '../Objects/Button';
import sortScores from '../helpers/sortScores';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  async create() {
    this.titleText = this.add.text(
      (config.width / 4), (config.height / 2) - 200,
      'Loading ... ', { fontSize: '42px', fill: '#ffffff' },
    );

    this.topScoredPlayers = await getLeaderBoard();

    if (this.topScoredPlayers) {
      this.titleText.setText('Top 10 players');
      this.menuButton = new Button(this, 400, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');
      const players = sortScores(this.topScoredPlayers.result);
      for (let index = 0; index < 10; index += 1) {
        if (players[index]) {
          this.add.text(
            (config.width / 4), (config.height / 2) - 120 + (index * 30),
            `${index + 1}. ${players[index].user}: ${players[index].score}`, { fontSize: '24px', fill: '#ffffff' },
          );
        }
      }
    }
  }
}