import Phaser from 'phaser';
import gameState from '../game-state/gameState';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.resetCursors();

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tiles', 'tiles');

    map.createStaticLayer('ground', tileset, 0, 0);

    const structureLayer = map.createStaticLayer('structures', tileset, 0, 0);

    structureLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject('objects', obj => obj.name === 'start');

    this.player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, 'player', 2)
      .setSize(32, 32)
      .setOffset(0, 24);

    this.physics.add.collider(this.player, structureLayer);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 16, end: 19 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.coins = this.physics.add.group();
    const coinPositions = map.objects[0].objects.filter(obj => obj.name === 'points');

    coinPositions.forEach(element => {
      this.coins.create(element.x, element.y, 'coin');
    });

    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

    gameState.score = 0;

    this.scoreText = this.add
      .text(16, 16, `Score: ${gameState.score}`, {
        font: '18px monospace',
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: '#000000',
      })
      .setScrollFactor(0);


    this.coinText = this.add
      .text(500, 16, `Coins collected: ${gameState.coins}`, {
        font: '18px monospace',
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: '#000000',
      })
      .setScrollFactor(0);

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);


    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 200; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

      this.spawns.create(x, y, 20, 20);
    }

    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
  }

  resetCursors() {
    const cursors = this.input.keyboard.createCursorKeys();
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    cursors.down.reset();
  }

  onMeetEnemy(player, zone) {
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    this.cameras.main.shake(300);

    this.input.stopPropagation();

    const cursors = this.input.keyboard.createCursorKeys();
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    cursors.down.reset();

    this.scene.switch('Battle');
  }


  collectCoin(player, coin) {
    coin.disableBody(true, true);

    //  Add and update the score
    gameState.coins += 1;
    gameState.score += 100;
    gameState.life += 10;

    if (gameState.coins === 10) {
      this.scene.switch('Over');
    }
  }

  update() {
    const { player } = this;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player.body.setVelocity(0);

    const speed = 200;
    // Horizontal movement
    if (this.cursors.left.isDown) {
      player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }

    player.body.velocity.normalize().scale(speed);

    // Player movement animation
    if (this.cursors.left.isDown) {
      player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      player.anims.play('down', true);
    } else {
      player.anims.stop();
    }

    // Coin rotation animation

    this.coins.children.iterate((child) => {
      child.play('spin', true);
    });


    this.scoreText.setText(`Score: ${gameState.score}`);
    this.coinText.setText(`Coins collected: ${gameState.coins}`);
  }
}
