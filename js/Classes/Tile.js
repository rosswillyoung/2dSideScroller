class Tile extends Phaser.GameObjects.Image {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    config.scene.physics.world.enable(this);
    this.setScale(0.05);
    this.setInteractive();
    this.on("pointerdown", (e) => {
      if (
        config.scene.player.getBounds().x >= this.getBounds().x - 20 &&
        config.scene.player.getBounds().x <= this.getBounds().x + 20 &&
        config.scene.player.getBounds().y >= this.getBounds().y - 30 &&
        config.scene.player.getBounds().y <= this.getBounds().y + 30
      ) {
        this.destroy();
      }
    });
  }
}
