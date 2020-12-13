import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }


  preload() {
    
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tiles', 'tiles');

    // const worldLayer =
    map.createStaticLayer('ground', tileset, 0, 0);

    const structureLayer = map.createStaticLayer('structures', tileset, 0, 0);

    structureLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject('objects', obj => obj.name === 'start');

    this.player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, 'player', 2)
      .setSize(32, 37)
      .setOffset(0, 24);

    this.physics.add.collider(this.player, structureLayer);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    const { player } = this;
    const cursors = this.input.keyboard.createCursorKeys();
    this.player.body.setVelocity(0);

    const speed = 200;
    // Horizontal movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }

    player.body.velocity.normalize().scale(speed);


    if (cursors.left.isDown) {
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      player.anims.play('down', true);
    } else {
      player.anims.stop();
    }
  }
}
