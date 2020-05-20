class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  create() {
    // let map = this.make.tilemap({ key: "background" });
    this.tiles = [];
    this.map = this.make.tilemap({ key: "wide" });
    this.tileset = this.map.addTilesetImage("background", "gradient");
    this.groundTileset = this.map.addTilesetImage("objects", "tiles");
    this.background = this.map.createStaticLayer(
      "Tile Layer 1",
      this.tileset,
      0,
      0
    );
    this.tileGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    // this.testTile = new Tile({
    //   scene: this,
    //   x: 100,
    //   y: 400,
    //   key: "singleTile",
    // });
    // this.tile1 = new Tile({
    //   scene: this,
    //   x: 16,
    //   y: 400,
    //   key: "singleTile",
    // });
    // this.testTile.setGravityY(-100);
    // this.tile = this.physics.add
    //   .staticImage(100, 400, "singleTile")
    //   .setScale(0.1)
    //   .refreshBody();

    // this.tileGroup.add(this.tile);
    // this.tileGroup.add(this.tile2);

    // this.ground = this.map.createStaticLayer(
    //   "ground",
    //   this.groundTileset,
    //   0,
    //   0
    // );
    // this.ground.setCollisionByExclusion(-1, true);
    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setGravityY(100);
    this.player.body.offset.y = 5;
    this.player.body.height = 22;
    this.player.setCollideWorldBounds();
    // this.physics.add.collider(this.player, this.ground, (e) => {});
    this.physics.add.collider(this.player, this.tileGroup, (e, e2) => {
      this.setTouching();
    });
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
    this.createTiles();
  }
  update() {
    if (
      (this.keys.space.isDown || this.keys.up.isDown) &&
      (this.player.body.onFloor() || this.touching)
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

  setTouching() {
    this.touching = true;
    setTimeout(() => {
      this.touching = false;
    }, 100);
  }

  createTiles() {
    for (let i = 0; i < 100; i++) {
      this.tiles[i] = new Tile({
        x: i * 16,
        y: 400,
        key: "singleTile",
        scene: this,
      });
      this.tileGroup.add(this.tiles[i]);
    }
  }
}
