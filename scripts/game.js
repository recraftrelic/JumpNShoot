/*const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 450, // Canvas height in pixels
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

var bullets;
var speed;
var stats;
var lastFired = 0;
var jump = 0;
var jumpmax = 2;
var lastjump = 0;

const game = new Phaser.Game(config);

function playerHit(player, spike) {
player.setVelocity(0, 0);
player.setX(50);
player.setY(0);
player.play('idle', true);
player.setAlpha(0);
let tw = this.tweens.add({
  targets: player,
  alpha: 1,
  duration: 100,
  ease: 'Linear',
  repeat: 5,
});
}

function preload() {
this.load.image('background', '../assets/images/background.png');
this.load.image('spike', '../assets/images/spike.png');
// At last image must be loaded with its JSON
this.load.atlas('player', '../assets/images/kenney_player.png','../assets/images/kenney_player_atlas.json');
this.load.image('tiles', '../assets/tilesets/platformPack_tilesheet.png');
this.load.image('bullet', '../assets/bullet.png');
// Load the export Tiled JSON
this.load.tilemapTiledJSON('map', '../assets/tilemaps/level1.json');
}

function create() {
var Bullet = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  initialize:

  function Bullet (scene)
  {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    this.speed = Phaser.Math.GetSpeed(400, 1);
    this.setScrollFactor(0);
  },

  fire: function (x, y)
  {
    this.setPosition(x +30, y +10);
    this.setActive(true);
    this.setVisible(true);
  },

  update: function (time, delta)
  {
    this.x += this.speed * delta;
    if (this.x > 800)
    {
      this.setActive(false);
      this.setVisible(false);
    }
  }
})

bullets = this.physics.add.group({
  classType: Bullet,
  maxSize: 20,
  runChildUpdate: true
})

speed = Phaser.Math.GetSpeed(700, 1);
this.cameras.main.setBackgroundColor("#ffffff");
this.cameras.main.setBounds(0, 0, 19000, 200);
this.cameras.main.setZoom(1);
this.cameras.main.centerOn(0, 0);

const map = this.make.tilemap({ key: 'map' })
const tileset = map.addTilesetImage('level1tileset', 'tiles')
const platforms = map.createStaticLayer('Tile Layer 1', tileset, 0, 0)

platforms.setCollisionByExclusion(-1, true);

this.player = this.physics.add.sprite(50, 0, 'player')
this.player.setBounce(0.1)
this.player.setCollideWorldBounds(true)
this.player.setScrollFactor(0)
this.physics.add.collider(this.player, platforms)

this.player.body.setSize(this.player.width - 25, this.player.height - 30).setOffset(12.5, 30);

this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNames('player', {
    prefix: 'robo_player_',
    start: 2,
    end: 3
  }),
  frameRate: 10,
  repeat: -1
})

this.anims.create({
  key: 'idle',
  frames: [{ key: 'player', frame: 'robo_player_0' }],
  frameRate: 10,
});

this.anims.create({
  key: 'jump',
  frames: [{ key: 'player', frame: 'robo_player_1' }],
  frameRate: 10,
});

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

this.physics.add.collider(this.player, this.spikes, playerHit, null, this);
}

function update(time, delta) {
var cam = this.cameras.main;
cam.scrollX += 7

if (this.cursors.left.isDown) 
{
  this.player.setVelocityX(-100);
  if (this.player.body.onFloor()) 
  {
    this.player.play('walk', true);
  }
} 
else if (this.cursors.right.isDown) 
{
  this.player.setVelocityX(100);
  if (this.player.body.onFloor()) 
  {
    this.player.play('walk', true);
  }
} 
else 
{
  this.player.setVelocityX(0);
  if (this.player.body.onFloor()) 
  {
    this.player.play('idle', true);
  }
}

if (this.cursors.up.isDown && jump < jumpmax && time > lastjump) 
{
  this.player.setVelocityY(-350);
  this.player.play('jump', true);
  jump += 1;
  lastjump = time + 400
}

if (this.player.body.onFloor() && jump == jumpmax)
{
  jump = 0;
}

if (this.cursors.space.isDown && time > lastFired)
{
  var bullet = bullets.get();
  if (bullet)
  {
    bullet.fire(this.player.x, this.player.y);
    lastFired = time + 50;
    bullet.body.setAllowGravity(false);
  }
}

if (this.player.body.velocity.x > 0) 
{
  this.player.setFlipX(false);
} 
else if (this.player.body.velocity.x < 0) 
{
  this.player.setFlipX(true);
}

}*/

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 450, // Canvas height in pixels
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

function playerHit(player, spike) {
player.setVelocity(0, 0);
player.setX(50);
player.setY(0);
player.play('idle', true);
player.setAlpha(0);
let tw = this.tweens.add({
  targets: player,
  alpha: 2,
  duration: 100,
  ease: 'Linear',
  repeat: 5,
});
}

function preload() {
this.load.image('background', '../assets/images/background.png');
this.load.image('spike', '../assets/images/spike.png');
// At last image must be loaded with its JSON
this.load.atlas('player', '../assets/images/kenney_player.png','../assets/images/kenney_player_atlas.json');
this.load.image('tiles', '../assets/tilesets/platformPack_tilesheet.png');
// Load the export Tiled JSON
this.load.tilemapTiledJSON('map', '../assets/tilemaps/level1.json');
}

function create() {
const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0)
backgroundImage.setScale(2, 0.8)

const map = this.make.tilemap({ key: 'map' })
const tileset = map.addTilesetImage('level1tileset', 'tiles')
const platforms = map.createStaticLayer('Tile Layer 1', tileset, 0, 0)

platforms.setCollisionByExclusion(-1, true);

this.player = this.physics.add.sprite(50, 0, 'player')
this.player.setBounce(0.1)
this.player.setCollideWorldBounds(true)
this.physics.add.collider(this.player, platforms)

this.player.body.setSize(this.player.width - 25, this.player.height - 30).setOffset(12.5, 30);

this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNames('player', {
    prefix: 'robo_player_',
    start: 2,
    end: 3
  }),
  frameRate: 10,
  repeat: -1
})

this.anims.create({
  key: 'idle',
  frames: [{ key: 'player', frame: 'robo_player_0' }],
  frameRate: 10,
});

this.anims.create({
  key: 'jump',
  frames: [{ key: 'player', frame: 'robo_player_1' }],
  frameRate: 10,
});

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

this.physics.add.collider(this.player, this.spikes, playerHit, null, this);
}

function update(time, delta) {
// Control the player with left or right keys
if (this.cursors.left.isDown) {
  this.player.setVelocityX(-200);
  if (this.player.body.onFloor()) {
    this.player.play('walk', true);
  }
} else if (this.cursors.right.isDown) {
  this.player.setVelocityX(200);
  if (this.player.body.onFloor()) {
    this.player.play('walk', true);
  }
} else {
  // If no keys are pressed, the player keeps still
  this.player.setVelocityX(0);
  // Only show the idle animation if the player is footed
  // If this is not included, the player would look idle while jumping
  if (this.player.body.onFloor()) {
    this.player.play('idle', true);
  }
}

// Player can jump while walking any direction by pressing the space bar
// or the 'UP' arrow
if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
  this.player.setVelocityY(-350);
  this.player.play('jump', true);
}

if (this.player.body.velocity.x > 0) {
  this.player.setFlipX(false);
} else if (this.player.body.velocity.x < 0) {
  // otherwise, make them face the other side
  this.player.setFlipX(true);
}
}
