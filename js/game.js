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


var scoreText;
var score = 0;

var platforms;
var ball;
var ballXScale = 0.2;
var ballYScale = 0.2;

var spaceKey;
var right

var ground;
var pillars = [];
var hitPlatform; 
var hitGround;
var hitPillar;

var score = 0;
var scoreText;

var MAX_PILLARS = 5;
var pillar;


function create() 
{



	
	game.physics.startSystem(Phaser.Physics.ARCADE); //initilizing arcade physics

	platforms = game.add.group();


	background = game.add.sprite(0,0, 'background');
	game.physics.arcade.checkCollision.left = false;

	

	platforms = game.add.group(); 
	ground = game.add.tileSprite(0, game.world.height - 50, game.world.width, 50, 'ground');
	ball = game.add.sprite(100, 50, 'ball');

	game.physics.enable([ball, ground], Phaser.Physics.ARCADE);
	platforms.enableBody = true;
	ground.body.immovable = true;
	ground.autoScroll(-200,0); 
	ball.checkWorldBounds = true;
	ball.events.onOutOfBounds.add(function(){
    alert('Game over!');
    location.reload();
	}, this);
	ground.body.friction.set(1);

	ball.anchor.setTo(0.5, 0.5);

	ball.scale.setTo(ballXScale, ballYScale);

	
	ball.body.collideWorldBounds = true; //treating boundaries as collision objects
	ball.body.bounce.set(0.1); //setting bounce
	ball.body.gravity.set(0,1500); //setting gravity
	ball.body.velocity.set(0, 150); //setting x and y velocity to the ball

	 //adding physics to ball
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	scoreText = game.add.text(game.world.width/2-100, 5, 'Points: 0', { font: '50px Arial', fill: '#0095DD' });

}


function update() 
{


	hitPlatform = game.physics.arcade.collide(ball, platforms);
	hitGround = game.physics.arcade.collide(ball, ground);
	hitPillar = game.physics.arcade.collide(ball, pillars);

	//game.time.events.loop(Phaser.Timer.SECOND * 10, generatePillars, this);

	spaceKey.onUp.add(jump);

	
	ball.angle += 20;

	if(pillars.length < MAX_PILLARS)
	{
		//game.time.events.loop(Phaser.Timer.SECOND * 1, generatePillars, this);
		generatePillars();
	}
	else
	{
		destroyPillars();
	}


	if(hitGround) {
		ball.body.velocity.x   = -5;
	}


	if((pillars[0].x <= ball.x ) && (pillars.length > 0) && (pillars[0].x >= ball.x - 5))  {
		
		score += 1;
    	scoreText.setText('Points: '+score);
	}

}




function generatePillars()
{
	
	var randX = game.world.width + (Math.random() * 800);


	if(pillars.length > 0)
	{	
		if(randX - 200 > pillars[pillars.length - 1].x + pillars[pillars.length - 1].width)
		{
			pillar = game.add.sprite(randX, game.world.height - ground.height, 'pillar');
			game.physics.enable([ball,pillar], Phaser.Physics.ARCADE);
			pillar.body.immovable = true;
			pillar.body.velocity.set(-200,0);
			pillar.anchor.setTo(0.5, 1);
			pillar.scale.setTo(1, (Math.random() * (1 - 0.4) + 0.4));
			pillars.push(pillar);
			
		}
	}
	else
	{
			pillar = game.add.sprite(randX, game.world.height - ground.height, 'pillar');
			game.physics.enable(pillar, Phaser.Physics.ARCADE);
			pillar.body.immovable = true;
			pillar.body.velocity.set(-200,0);
			pillar.anchor.setTo(0.5, 1);
			pillar.scale.setTo(1, (Math.random() * (1 - 0.4) + 0.4));
			pillars.push(pillar);
	}
}


function destroyPillars() {


	pillars.forEach(function(item, index, array) {
		if((item.x+item.width) < 0) {
			item.destroy();
			pillars.splice(index, 1);
		}
	});

}

	

function jump() {


	if(hitGround ){
		var jumpHeight;
		console.log(spaceKey.duration*3);
		jumpHeight = spaceKey.duration*3;

		if(jumpHeight > 800) {
			jumpHeight = 800;
		}
		ball.body.velocity.y = -jumpHeight;

		ball.body.velocity.x = 50;
  
	}



}


function scoring() {

	if(pillars.length > 0)
	for(var i = 0; i < pillars.length; i++)
	{
		if(pillar.x <= ball.x)
		{
			score = score + 1000;
			scoreText = "score: " + score;
		}
	}
}



	

