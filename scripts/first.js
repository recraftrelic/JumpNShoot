var config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 270 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var bullets;
var ship;
var aliens;
var speed;
var stats;
var lastFired = 0;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/mario-bg.png');
    this.load.image('dude', 'assets/character.png');
    this.load.image('ship', 'assets/character.png');
    this.load.image('enemy', 'assets/enemy-new.png');
    this.load.image('base', 'assets/ground.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('dude', 
    'assets/character.png',
    { frameWidth: 32, frameHeight: 48 }
    );
}

var platforms;
var player;
var cursors;

function create ()
{
    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.speed = Phaser.Math.GetSpeed(400, 1);
        },

        fire: function (x, y)
        {
            this.setPosition(x +50, y -50);
            
            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.x += this.speed * delta;

            if (this.x > 700)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });


    cursors = this.input.keyboard.createCursorKeys();

    speed = Phaser.Math.GetSpeed(300, 1);
    
    this.add.image(400, 435, 'sky'); 
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 570, 'base');
    player = this.physics.add.sprite(170, 270, 'dude');

    this.physics.add.collider(player, platforms);

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    aliens = this.physics.add.sprite(660, 270, 'enemy');
    this.physics.add.collider(aliens, platforms);

    aliens.setBounce(0);
    aliens.setCollideWorldBounds(true);

}

var jump = 0;

function update (time, delta)
{

    if (player.body.touching.down) {
        jump = 2;
    }
    
    if (cursors.up.isDown && jump > 0) {
        jump++;
        player.body.velocity.y = -270;
    }

    if (cursors.left.isDown)
    {
        player.x -= speed * delta;
    }
    else if (cursors.right.isDown)
    {
        player.x += speed * delta;
    }

    if (cursors.space.isDown && time > lastFired)
    {
        var bullet = bullets.get();

        if (bullet)
        {
            bullet.fire(player.x, player.y);

            lastFired = time + 50;
        }
        //aliens.setCollideWorldBounds(false);
    }

if (cursors.up.isDown && player.body.onFloor()) 
{
    player.setVelocityY(-270);
}
}