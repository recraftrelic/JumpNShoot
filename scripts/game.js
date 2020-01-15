const config = {
    type: Phaser.CANVAS, // Which renderer to use
    width: 800, // Canvas width in pixels
    height: 400, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
      },
    }
  };
  
const game = new Phaser.Game(config);

function preload() {
  this.load.image('spike', '../assets/images/spike.png');
  // At last image must be loaded with its JSON
  this.load.image('player', '../assets/Solid_black.svg');
  this.load.image('tiles', '../assets/tilesets/platformPack_tilesheet.png');
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', '../assets/tilemaps/level1.json');
}

function create() {

  this.cameras.main.setBackgroundColor("#ffffff");

  this.cameras.main.setBounds(0, 0, 10000, 200);

  this.cameras.main.setZoom(1);
  this.cameras.main.centerOn(0, 0);

  const map = this.make.tilemap({ key: 'map' })
  const tileset = map.addTilesetImage('level1tileset', 'tiles')
  const platforms = map.createStaticLayer('Tile Layer 1', tileset, 0, 2)

  platforms.setCollisionByExclusion(-1, true);

  this.player = this.physics.add.sprite(50, 0, 'player')
  this.player.setScale(0.25)
  this.player.setBounce(0.1)
  this.player.setScrollFactor(0)
  this.physics.add.collider(this.player, platforms)
  
  this.cursors = this.input.keyboard.createCursorKeys();

  this.spikes = this.physics.add.group({
    allowGravity: false,
    immovable: true
  })

  const spikeObjects = map.getObjectLayer('Spikes')['objects']

  spikeObjects.forEach(spikeObject => {
    const spike = this.spikes.create(spikeObject.x, spikeObject.y - spikeObject.height, 'spike').setOrigin(0, 0)
    spike.body.setSize(spike.width, spike.height - 30).setOffset(0, 30);
  })

  this.platforms = platforms
}

function update(time, delta) {
  var cam = this.cameras.main;

  cam.scrollX += 8

  if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
    this.player.setVelocityY(-350);
  }

}
