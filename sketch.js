// textSlicer
// Werllen Castro, 2021
// github.com/werls
// 
// Originally made for Lâmina — MOSTRA AUDIOVISUAL PRETA
// http://mostralamina.com.br
// 
// Full design process on Behance:
// https://www.behance.net/gallery/122884567/LAMINA-Mostra-Audiovisual-Preta

p5.disableFriendlyErrors = true; // disables FES

function preload() {
	myfont = loadFont('./Syncopate-Bold.ttf');
}

function setup() {
background(0);
	txt = 'TEXT\nSLICER';
	distortion = 30;
	slicer = new textSlicer(txt, distortion);
	slicer.setupCanvas();
	slicer.setupText(txt); 
}

function draw() {
	clear();
	background(0);
	slicer.show();
	fill(0);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setup();
}

function showFrameRate() {
	push();
	fill(0);
	textSize(20);
	textFont('Courier New');
	text(floor(frameRate()),100,100);

	if (frameRate() < 30) {
		text('LOW PERFOMANCE', 100,120);
	}
	pop();
}