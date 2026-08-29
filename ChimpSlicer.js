let chimp;
let chimpSprite;

function preload() {
    chimpSprite = loadImage("./assets/sprites/chimp.png");
}

function setup() {
    createCanvas(600, 400);
    frameRate(30);

    chimp = new Chimp(chimpSprite);
}

function draw() {
    background(200);
    chimp.update();
    chimp.draw();
    line(pmouseX, pmouseY, mouseX, mouseY);
}
