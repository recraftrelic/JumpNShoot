var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  physics: {
      default: 'impact'
  },
  scene: {
      preload: preload,
      create: create,
  }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('block', 'assets/character.png');
  this.load.image('bullet', 'assets/bullet.png')
  this.load.image('enemy', 'assets/enemy-new.png')
}

function create ()
{
  var blockA = this.impact.add.image(300, 300, 'bullet');
  var blockB = this.impact.add.image(60, 300, 'block');
  var blockC = this.impact.add.image(730, 300, 'enemy');

  blockA.setTypeA().setCheckAgainstB().setActiveCollision().setMaxVelocity(300);
  blockC.setTypeB().setCheckAgainstA().setFixedCollision();

  blockA.setVelocityX(300);

  this.impact.world.on('collide', collide);
}

function collide (bodyA, bodyB, axis)
{
  bodyA.gameObject.setTint(0xff0000);
}