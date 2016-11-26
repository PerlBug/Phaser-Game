var game = new Phaser.Game(800, 450, Phaser.AUTO, null, {
      preload: preload, create: create, update: update
    });


function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
	game.load.image('background', 'assets/background.png');
	game.load.image('ball','assets/ball.png')
}



var platforms;
var ball;

function create() 
{
	//initilizing arcade physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	platforms = game.add.group();

	background = game.add.sprite(0,0, 'background');
	ball = game.add.sprite(50, 50, 'ball');
	ball.scale.setTo(0.5, 0.5);

	//adding physics to ball
	game.physics.enable(ball, Phaser.Physics.ARCADE);
	//setting x and y velocity to the ball
	ball.body.velocity.set(150, 150);

}

function update() {

}
