var game = new Phaser.Game(800, 450, Phaser.AUTO, null, {
      preload: preload, create: create, update: update
    });


function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
	game.load.image('background', 'assets/background.png');
	game.load.image('ground', 'assets/ground.png');
	game.load.image('ball','assets/ball.png');

}



var platforms;
var ball;


function create() 
{


	//initilizing arcade physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	


	background = game.add.sprite(0,0, 'background');


	platforms = game.add.group();
	platforms.enableBody = true;
	var ground = platforms.create(0, game.world.height - 50, 'ground');

	ground.scale.setTo(8,1);
	ground.body.immovable = true;


	ball = game.add.sprite(50, 50, 'ball');
	ball.scale.setTo(0.5, 0.5); 


	//adding physics to ball
	game.physics.enable(ball, Phaser.Physics.ARCADE);
	//setting x and y velocity to the ball
	ball.body.velocity.set(150, 150);
	ball.body.collideWorldBounds = true;


}


function update() 
{
	var hitPlatform = game.physics.arcade.collide(ball, platforms);
}
