let chimpSprite;
let chimps = [];

function preload() {
    chimpSprite = loadImage("./assets/sprites/chimp.png");
}

function setup() {
    createCanvas(600, 400);
    frameRate(60);

    for (var i = 0; i < 10; i++){
        chimps.push(new Chimp(random(0, width), height, chimpSprite));
    }
}

function draw() {
    background(200);
    for (let i = chimps.length - 1; i >= 0; i--) {
        chimps[i].update();
        chimps[i].draw();
        if (chimps[i].isCollidingWithMouse()) {
            chimps.splice(i, 1);
        }
    }
    line(pmouseX, pmouseY, mouseX, mouseY);
}
