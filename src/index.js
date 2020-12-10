import Phaser from 'phaser';
import logoImg from './assets/coronavirus.jpg';

function preload() {
  this.load.image('logo', logoImg);
}

function create() {
  const logo = this.add.image(200, 150, 'logo');

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1,
  });
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
  },
};

window.game = new Phaser.Game(config);
