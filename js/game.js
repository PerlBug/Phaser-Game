var game = new Phaser.Game(800, 450, Phaser.AUTO, null, {
      preload: preload, create: create, update: update
    });


function preload() 
{
	game.load.image('background', 'assets/background.png');
	game.load.image('ground', 'assets/ground.png');
}

var platforms;


function create() 
{
	
	background = game.add.sprite(0,0, 'background');

	platforms = game.add.group();
	var ground = platforms.create(0, game.world.height - 50, 'ground');
	ground.scale.setTo(8,1);
	

}

function update() 
{


}

