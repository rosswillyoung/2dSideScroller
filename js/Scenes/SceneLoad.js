class SceneLoad extends Phaser.Scene {
  constructor() {
    super("SceneLoad");
  }
  preload() {
    this.load.image("tiles", "Assets/tilemaps/Tiles_32x32.png");
    this.load.image("gradient", "Assets/tilemaps/BackgroundGradient.png");
    this.load.tilemapTiledJSON("wide", "Assets/tilemaps/wide.json");
    this.load.spritesheet("player", "Assets/tilemaps/character.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
  }
  create() {
    this.scene.start("SceneMain");
  }
}
