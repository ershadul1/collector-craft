import Phaser from 'phaser';
import gameState from '../game-state/gameState';
import sleep from '../helpers/sleep';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
    this.turn = 1;
  }

  create() {
    this.enemyLife = 10;
    this.add.image(400, 300, 'background').setScale(3);
    this.player = this.physics.add.sprite(550, 250, 'player', 8).setScale(2);
    this.enemy = this.physics.add.sprite(250, 250, 'enemy', 0).setScale(1.2);

    this.scoreText = this.add
      .text(16, 16, `Score: ${gameState.score}`, {
        font: '18px monospace',
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: '#000000',
      })
      .setScrollFactor(0);


    this.enemyLifeText = this.add
      .text(50, 100, `Enemy Life: ${this.enemyLife}`, {
        font: '18px monospace',
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: '#000000',
      })
      .setScrollFactor(0);


    this.playerLifeText = this.add
      .text(550, 100, `Player Life: ${gameState.life}`, {
        font: '18px monospace',
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: '#000000',
      })
      .setScrollFactor(0);

    this.playerTurn();
  }


  playerTurn() {
    this.battleText = this.add
      .text(180, 490, 'Press space to attack')
      .setScale(2);
  }

  attack() {
    const random = Phaser.Math.RND.between(2, 5);

    this.battleText.setText('Enemy damage');
    this.enemyLife -= random;
    this.turn = 2;

    this.cameras.main.shake(200);
    sleep(2000).then(() => {
      this.battleText.setText('Player damage');
      gameState.life -= random;

      this.cameras.main.shake(200);
    }).then(() => {
      sleep(2000).then(() => {
        this.battleText.setText('Press space to attack');
        this.turn = 1;
      });
    });


    if (this.enemyLife <= 0 && gameState.life > 0) {
      sleep(2000).then(() => {
        this.battleText.setText('Enemy has died');
        gameState.score += 10;
      }).then(() => {
        sleep(2000).then(() => {
          this.enemyLife = 10;
          this.scene.switch('Game');
        });
      });
    }

    if (gameState.life <= 0) {
      sleep(2000).then(() => {
        this.battleText.setText('You have died');
      }).then(() => {
        sleep(2000).then(() => {
          this.scene.switch('Over');
        });
      });
    }
  }


  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (this.turn === 1 && cursors.space.isDown) {
      this.attack();
    }

    this.scoreText.setText(`Score: ${gameState.score}`);
    this.enemyLifeText.setText(`Enemy Life: ${this.enemyLife}`);
    this.playerLifeText.setText(`Player Life: ${gameState.life}`);

    if (this.enemyLife < 0) {
      this.enemyLifeText.setText('Enemy Life: 0');
    } else {
      this.enemyLifeText.setText(`Enemy Life: ${this.enemyLife}`);
    }

    if (gameState.life < 0) {
      this.playerLifeText.setText('Player Life: 0');
    } else {
      this.playerLifeText.setText(`Player Life: ${gameState.life}`);
    }
  }
}
