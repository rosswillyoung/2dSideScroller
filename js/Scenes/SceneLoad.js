class SceneLoad extends Phaser.Scene {
  constructor() {
    super("SceneLoad");
  }
  preload() {
    this.load.image("tiles", "Assets/tilemaps/DG.png");
    this.load.image("gradient", "Assets/tilemaps/BackgroundGradient.png");
    this.load.tilemapTiledJSON("test", "Assets/tilemaps/untitled.json");
  }
  create() {
    this.scene.start("SceneMain");
  }
}
