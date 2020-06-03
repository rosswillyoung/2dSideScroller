class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene = this.scene;
    config.scene.add.existing(this);
    config.scene.physics.world.enable(this);
    this.body.offset.y = 5;
    this.body.height = 22;
    this.body.offset.x = 1;
    this.body.width = 14;
    this.setCollideWorldBounds();
  }
}
