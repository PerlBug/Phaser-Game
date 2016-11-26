var game = new Phaser.Game(800, 600, Phaser.AUTO, null, {
      preload: preload, create: create, update: update
    });


function preload() 
{
	game.load.image('background', 'assets/background.png');
}

var platforms;

function create() 
{
	ground = game.add.sprite(0,0, 'background');

}
function update() 
{


}

