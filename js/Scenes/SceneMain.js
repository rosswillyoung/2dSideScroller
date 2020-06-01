class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  create() {
    // tile array so we can programmatically create tiles and point to them
    this.tiles = [];
    this.map = this.make.tilemap({ key: "wide" });
    this.tileset = this.map.addTilesetImage("background", "gradient");
    // this.groundTileset = this.map.addTilesetImage("objects", "tiles");
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
    this.createTiles();

    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.body.offset.y = 5;
    this.player.body.height = 22;
    this.player.body.offset.x = 1;
    this.player.body.width = 14;
    this.player.setCollideWorldBounds();
    this.physics.add.collider(this.player, this.tileGroup, (e, e2) => {
      if (e.body.x > e2.body.x - 12 && e.body.x < e2.body.x + 12) {
        this.setTouching();
      }
      // console.log(e.body.center.x, e2.body.center.x);
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
  }
  update() {
    // if (this.player.body.touching.down) {
    //   this.setTouching();
    // }
    // this.player.body.onFloor() ||
    if ((this.keys.space.isDown || this.keys.up.isDown) && this.touching) {
      this.player.setVelocityY(-100);
      console.log(this.player);
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

  // set a variable to true and then back to false after a millisecond
  // using this to allow for jumping after player collides with floor
  setTouching() {
    this.touching = true;
    setTimeout(() => {
      this.touching = false;
    }, 100);
  }

  createTiles() {
    // y location to start the tiles at
    let yy = 300;
    for (let x = 0; x < 20; x++) {
      this.tiles[x] = [];
      for (let i = 0; i < 100; i++) {
        this.tiles[x][i] = new Tile({
          x: i * 16,
          y: yy,
          key: this.getRandomTile(yy),
          scene: this,
        });
        this.tileGroup.add(this.tiles[x][i]);
        // this.tiles[x][i].body.offset.x = 0.5;
        // this.tiles[x][i].body.width = 15;
      }
      yy += 16;
    }
  }

  getRandomTile(y) {
    let tileRNG = Math.random();
    if (y <= 300) {
      return "singleTile";
    } else if (tileRNG > 0.7 && tileRNG < 0.9) {
      return "clayTile";
    } else if (tileRNG >= 0.9) {
      return "purpleTile";
    } else {
      return "normalTile";
    }
  }
}
