class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  create() {
    // let map = this.make.tilemap({ key: "background" });
    this.map = this.make.tilemap({ key: "wide" });
    this.tileset = this.map.addTilesetImage("background", "gradient");
    this.groundTileset = this.map.addTilesetImage("objects", "tiles");
    this.background = this.map.createStaticLayer(
      "Tile Layer 1",
      this.tileset,
      0,
      0
    );
    this.ground = this.map.createStaticLayer(
      "ground",
      this.groundTileset,
      0,
      0
    );
    this.ground.setCollisionByExclusion(-1, true);

    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.body.offset.y = 5;
    this.player.body.height = 22;
    this.player.setCollideWorldBounds();
    this.physics.add.collider(this.player, this.ground, (e) => {});
    this.keys = this.input.keyboard.addKeys({
      a: "A",
      d: "D",
      space: "SPACE",
      up: "UP",
      left: "LEFT",
      right: "RIGHT",
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 0.1,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 51, end: 54 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 17, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
  }
  update() {
    if (
      (this.keys.space.isDown || this.keys.up.isDown) &&
      this.player.body.onFloor()
    ) {
      this.player.setVelocityY(-100);
    }
    if (this.keys.d.isDown || this.keys.right.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play("right", true);
    } else if (this.keys.a.isDown || this.keys.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.anims.play("left", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle", true);
    }
  }
}
