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
	game.load.image('pillar','assets/pillar.png');

}



var platforms;
var ball;
var ballXScale = 0.2;
var ballYScale = 0.2;
var spaceKey;
var ground;
var pillars;


function create() 
{



	
	game.physics.startSystem(Phaser.Physics.ARCADE); //initilizing arcade physics

	platforms = game.add.group();


	background = game.add.sprite(0,0, 'background');


	platforms = game.add.group(); 
	ground = game.add.tileSprite(0, game.world.height - 50, game.world.width, 50, 'ground');
	ball = game.add.sprite(50, 50, 'ball');

	game.physics.enable([ball, ground], Phaser.Physics.ARCADE);
	platforms.enableBody = true;
	ground.body.immovable = true;
	ground.autoScroll(-200,0); 



	ball.anchor.setTo(0.5, 0.5);

	ball.scale.setTo(ballXScale, ballYScale);

	
	ball.body.collideWorldBounds = true; //treating boundaries as collision objects
	ball.body.bounce.set(0.3); //setting bounce
	ball.body.gravity.set(0,700); //setting gravity
	ball.body.velocity.set(0, 150); //setting x and y velocity to the ball

	 //adding physics to ball
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	pillars = game.time.events.loop(Phaser.Timer.SECOND * 3, generatePillars, this);

}


function update() 
{
	var hitPlatform = game.physics.arcade.collide(ball, platforms);
	var hitGround = game.physics.arcade.collide(ball, ground);
	
	if(spaceKey.isDown && hitGround)
	{
		ball.body.velocity.y = -300;
	}

	ball.angle += 30;
}


function generatePillars()
{
	console.log('generate pillars');
}
