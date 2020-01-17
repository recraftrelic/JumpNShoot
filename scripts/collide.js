var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'matter',
      matter: {
          gravity: {
              x: 0,
              y: 0
          }
      }
  },
  scene: {
      preload: preload,
      create: create
  }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('block', 'assets/enemy-new.png');
  this.load.image('bullet', 'assets/bullet.png');
}

function create ()
{
  var blockA = this.matter.add.image(0, 300, 'bullet').setBounce(0).setFriction(0);

  var blockB = this.matter.add.image(600, 300, 'block').setStatic(true);

  blockA.setVelocityX(10);

  this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

      bodyB.gameObject.setTint(0xff0000);
      //bodyB.gameObject.setTint(0x00ff00);
  });
}