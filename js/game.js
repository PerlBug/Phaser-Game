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
var ballXScale = 0.2;
var ballYScale = 0.2;
var spaceKey;


function create() 
{



	
	game.physics.startSystem(Phaser.Physics.ARCADE); //initilizing arcade physics
	platforms = game.add.group();


	background = game.add.sprite(0,0, 'background');


	platforms = game.add.group(); 
	platforms.enableBody = true;
	var ground = platforms.create(0, game.world.height - 50, 'ground');

	ground.scale.setTo(8,1);
	ground.body.immovable = true;


	ball = game.add.sprite(50, 50, 'ball');
	ball.scale.setTo(ballXScale, ballYScale);


	
	game.physics.enable(ball, Phaser.Physics.ARCADE); //adding physics to ball
	ball.body.collideWorldBounds = true; //treating boundaries as collision objects
	ball.body.bounce.set(0); //setting bounce to 0
	
	ball.body.velocity.set(0, 150); //setting x and y velocity to the ball

	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}


function update() 
{
	var hitPlatform = game.physics.arcade.collide(ball, platforms);


}
