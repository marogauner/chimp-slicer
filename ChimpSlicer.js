let chimpSprite;
let chimps = [];
let slicer = new Slicer();

function preload() {
  chimpSprite = loadImage("./assets/sprites/chimp.png");
}

function setup() {
  createCanvas(600, 400);
  frameRate(60);

  spawnChimps(10);
  createRestartButton();
}

function draw() {
  background(200);
  updateChimps();
  slicer.update();
  slicer.draw();
}

function spawnChimps(x) {
  for (var i = 0; i < x; i++) {
    chimps.push(new Chimp(random(0, width), height, chimpSprite));
  }
}

function createRestartButton() {
  let restartButton = createButton("restart");
  restartButton.position(width + 20, 10);
  restartButton.mousePressed(() => {
    spawnChimps(floor(random(5, 50)));
  });
  restartButton.addClass("restart-button");
}

function updateChimps() {
  for (let i = chimps.length - 1; i >= 0; i--) {
    chimps[i].update();
    chimps[i].draw();
    if (chimps[i].isCollidingWithMouse() || chimps[i].isOffScreen()) {
      chimps.splice(i, 1);
    }
  }
}
