let chimpSprite;
let chimps = [];

function preload() {
    chimpSprite = loadImage("./assets/sprites/chimp.png");
}

function setup() {
    createCanvas(600, 400);
    frameRate(60);

    for (var i = 0; i < 1; i++){
        chimps.push(new Chimp(random(0, width), height, chimpSprite));
    }
}

function draw() {
    background(200);
    for (var i = 0; i < chimps.length; i++) {
        chimps[i].update();
        chimps[i].draw();
    }
    line(pmouseX, pmouseY, mouseX, mouseY);
}
