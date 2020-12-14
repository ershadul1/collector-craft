import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
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

    this.score = 0;

    this.scoreText = this.add
      .text(16, 16, `Score: ${this.score}`, {
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
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    // add collider
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    // we listen for 'wake' event
    this.sys.events.on('wake', this.wake, this);
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(300);

    this.input.stopPropagation();
    // start battle
    this.scene.switch('BattleScene');
  }


  collectCoin(player, coin) {
    coin.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
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

    // Player movement animation
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

    // Coin rotation animation

    this.coins.children.iterate((child) => {
      child.play('spin', true);
    });
  }
}
