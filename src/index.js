import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BattleScene from './Scenes/BattleScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';
import GameOverScene from './Scenes/GameOverScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Battle', BattleScene);
    this.scene.add('Over', GameOverScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
