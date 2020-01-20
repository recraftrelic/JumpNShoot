const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 450,
  pixcelArt: true,
  parent: "game-container",
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
var controls;
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

const map = this.make.tilemap({ key: 'map' })
const tileset = map.addTilesetImage('level1tileset', 'tiles')
const platforms = map.createStaticLayer('Tile Layer 1', tileset, 0, 0)

platforms.setCollisionByExclusion(-1, true);
//this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

this.player = this.physics.add.sprite(50, 0, 'player')
this.player.setBounce(0.1)
this.player.setCollideWorldBounds(true)
this.player.setScrollFactor(0)
this.physics.add.collider(this.player, platforms)

this.player.body.setSize(this.player.width - 25, this.player.height - 30).setOffset(12.5, 30);

this.cursors = this.input.keyboard.createCursorKeys();

speed = Phaser.Math.GetSpeed(700, 1);
this.cameras.main.setBackgroundColor("#ffffff");
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
this.cameras.main.setZoom(1);
this.cameras.main.centerOn(0, 0);
this.cameras.main.setRoundPixels(true);
//this.cameras.main.startFollow(this.player, true, 0.06, 0.06);

/*var controlConfig = {
  camera: this.cameras.main,
  left: this.cursors.left,
  right: this.cursors.right,
  speed: 0.5
};

controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);*/

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

this.spikes = this.physics.add.group({
  allowGravity: false,
  immovable: true
})

const spikeObjects = map.getObjectLayer('Spikes')['objects']

spikeObjects.forEach(spikeObject => {
  const spike = this.spikes.create(spikeObject.x, spikeObject.y - spikeObject.height, 'spike').setOrigin(0, 0)
  spike.body.setSize(spike.width, spike.height - 30).setOffset(0, 30);
  spike.setScrollFactor(1)
})
this.platforms = platforms

this.physics.add.collider(this.player, this.spikes, playerHit, null, this);
}

function update(time, delta) {
var cam = this.cameras.main;
cam.scrollX += 4
//cam.scrollX = this.player.x - 400;
//controls.update(delta);

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

}