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
var ground;
var hitPlatform; 
var hitGround;


function create() 
{



	
	game.physics.startSystem(Phaser.Physics.ARCADE); //initilizing arcade physics

	platforms = game.add.group();


	background = game.add.sprite(0,0, 'background');


	platforms = game.add.group(); 
	ground = game.add.tileSprite(0, game.world.height - 50, game.world.width, 50, 'ground');
	ball = game.add.sprite(100, 50, 'ball');

	game.physics.enable([ball, ground], Phaser.Physics.ARCADE);
	platforms.enableBody = true;
	ground.body.immovable = true;
	ground.autoScroll(-200,0); 



	ball.anchor.setTo(0.5, 0.5);

	ball.scale.setTo(ballXScale, ballYScale);

	
	ball.body.collideWorldBounds = true; //treating boundaries as collision objects
	ball.body.bounce.set(0.2); //setting bounce
	ball.body.gravity.set(0,1500); //setting gravity
	ball.body.velocity.set(0, 150); //setting x and y velocity to the ball

	 //adding physics to ball
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}


function update() 
{
	hitPlatform = game.physics.arcade.collide(ball, platforms);
	hitGround = game.physics.arcade.collide(ball, ground);


	spaceKey.onUp.add(jump);
	ball.angle += 20;

}

function jump() {
	if(hitGround){
		ball.body.velocity.y = -spaceKey.duration*2.3;
	}
	
}



