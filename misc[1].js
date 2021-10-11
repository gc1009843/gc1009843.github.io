function getMouseVector(){
	let mouseXalt = mouseX - turPosX;
	let mouseYalt = mouseY - turPosY;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}
	
function drawReticle(){
	noFill();
	strokeWeight(1.5);
	stroke(0, 100, 125, 125);
	ellipse(mouseX, mouseY, 20);
	stroke(80, 160, 200, 125);
	line(mouseX-14, mouseY-14, mouseX+14, mouseY+14);
	line(mouseX+14, mouseY-14, mouseX-14, mouseY+14);
	stroke(80, 160, 200, 125);
	line(turPosX, turPosY, mouseX, mouseY);
}

function gameOver(){
	push()
	
	print("DED");
	noStroke();
	fill(20)
	rect(0,200,600,200)
	
	textFont('Georgia');
	textAlign(CENTER);
	textSize(50);
	fill(170,20,20);
	text("YOU DIED",300,300)
		
	textFont('Helvetica');
	textSize(18);
	fill(235);
	let scoreString = "score: " + score;
	text(scoreString, 300, 340);
	
	if (score > highScore) {
		highScore = score;
		Cookies.remove('highscore');
		Cookies.set('highscore', highScore);
	}
	
	let highScoreString = "highscore: " + highScore;
	text(highScoreString, 300, 360);
	
	Retry.show();
	Retry.position(250, 380);
	Retry.size(100,30);
	Retry.style('background-color', '#202020');
	Retry.style('color', '#FFFFFF');
	Retry.mousePressed(reset);
	
	pop();
	noLoop();
	
}

function reset(){
	Retry.hide();
	bulletsFired = [];
	targetBalloons = [];
	turPosX = 300;
	turPosY = 300;
	targetTimer = 0;
	balloonSpawnMultiplier = 2;
	balloonSizeMultiplier = 2;
	score = 0;
	
	loop();
}