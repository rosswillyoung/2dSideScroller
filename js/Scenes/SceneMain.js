class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  create() {
    // let map = this.make.tilemap({ key: "background" });
    this.map = this.make.tilemap({ key: "test" });
    this.tileset = this.map.addTilesetImage("background", "gradient");
    this.background = this.map.createStaticLayer(
      "Tile Layer 1",
      this.tileset,
      0,
      0
    );
  }
}
