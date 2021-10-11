function preload() {plr = loadImage('player.png');}
let bulletsFired = [];
let targetBalloons = [];
let	mainTurrent;
let turPosX = 300;
let turPosY = 300;
let targetTimer = 0;
let balloonSpawnMultiplier = 2;
let balloonSizeMultiplier = 2;
let score = 0;
let Retry;
let highScore = 0;
var lives = 3;

function setup() {
	createCanvas(600, 600);
	angleMode(DEGREES);
	mainTurrent = new turrent(300,300);
	Retry = createButton('retry');
	Retry.hide();
	
	if (!Cookies.get('highscore')){
		Cookies.set('highscore', '0');
	}
	highScore = Cookies.get('highscore');
}


function mousePressed(){
	let mouseVector = getMouseVector();
	oneBullet = new bullet(mouseVector.x, mouseVector.y);
	bulletsFired.push(oneBullet);
}

function draw() {
	background(20);
	
	drawReticle();

	targetTimer += 1;
	let spawnInterval = int(100 / balloonSpawnMultiplier);
	//print(spawnInterval)
	if (targetTimer % spawnInterval == 0){
		let newBalloon = new balloon();
		targetBalloons.push(newBalloon);
		score += 5;
	}
	
	
	//----------------------------------------------BULLETS----------------------------------------
	for (var i = 0; i < bulletsFired.length; i++){
		bulletsFired[i].display();
		bulletsFired[i].update();
		if (bulletsFired[i].outOfBounds()){
      		bulletsFired.splice(i,1);
    	}
		else if (bulletsFired[i].hitScan()){
      		bulletsFired.splice(i,1);
    	}
	}
	
	
	//-------------------------------------------EVIL-BALLOONS----------------------------------------
	for (var i = 0; i < targetBalloons.length; i++){
		targetBalloons[i].display();
		targetBalloons[i].update();
		if (targetBalloons[i].outOfBounds()){
      		targetBalloons.splice(i,1);
    	}
	}
	
	balloonSpawnMultiplier += 0.001;
	if (balloonSizeMultiplier < 5){
		balloonSizeMultiplier += 0.001;
	}
	
	mainTurrent.display();
	mainTurrent.move();
	if (mainTurrent.hitScan()){
		gameOver();
	}
}	