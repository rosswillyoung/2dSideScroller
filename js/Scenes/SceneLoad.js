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
    this.load.image("singleTile", "Assets/images/1tile.png");
    this.load.image("clayTile", "Assets/images/2tile.png");
    this.load.image("purpleTile", "Assets/images/3tile.png");
    this.load.image("normalTile", "Assets/images/4tile.png");
  }
  create() {
    this.scene.start("SceneMain");
  }
}
