var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      physics: {
        arcade: {
          gravity: { y: 100},
          debug: false
        },
        impact: {
          gravity: 100,
          debug: false
        }
      }
  }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('block', 'assets/character.png');
  this.load.image('bullet', 'assets/bullet.png');
  this.load.image('enemy', 'assets/enemy-new.png');
}

function create ()
{
  var blockA = this.impact.add.image(300, 300, 'bullet');
  var blockB = this.physics.add.image(60, 300, 'block');
  var blockC = this.impact.add.image(730, 300, 'enemy');

  blockB.setBounce(0);
  blockB.setCollideWorldBounds(true);

  blockA.setTypeA().setCheckAgainstB().setActiveCollision().setMaxVelocity(300);
  blockC.setTypeB().setCheckAgainstA().setFixedCollision();

  blockA.setVelocityX(300);

  this.impact.world.on('collide', collide);
}

function collide (bodyA, bodyB, axis)
{
  bodyA.gameObject.setTint(0xff0000);
}