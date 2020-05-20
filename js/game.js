// let emitter;

let config = {
  width: 1000,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      // gravity: { y: 100 },
    },
  },
  scene: [SceneLoad, SceneMain],
};

let game = new Phaser.Game(config);
