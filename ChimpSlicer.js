// sprites
let chimpSprite;
let deadChimpHeadSprite;
let deadChimpBodySprite;
// ...
let chimps = [];
let bodyParts = [];
let slicer = new Slicer();
// spawning chimps
let lastSpawnTime = 0;
let spawnInterval = 3000;

function preload() {
  chimpSprite = loadImage("./assets/sprites/chimp.png");
  deadChimpHeadSprite = loadImage("./assets/sprites/deadChimpHead.png");
  deadChimpBodySprite = loadImage("./assets/sprites/deadChimpBody.png");
}

function setup() {
  createCanvas(600, 400);
  frameRate(60);
  noCursor();
  noSmooth();

  createRestartButton();
}

function draw() {
  background(200);
  chimpSpawner();
  updateChimps(slicer.trail);
  slicer.update();
  slicer.draw();
  drawDebugInfo();
}

function chimpSpawner() {
  let chimpAmount = random(5, 10);
  let elapsedTime = millis() - lastSpawnTime;
  if (elapsedTime >= spawnInterval) {
    spawnChimps(chimpAmount);
    lastSpawnTime = millis();
  }
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

function updateChimps(mousePositions) {
  for (let i = chimps.length - 1; i >= 0; i--) {
    chimps[i].update();
    chimps[i].draw();
    if (chimps[i].isCollidingWithMouse(mousePositions)) {
      spawnChimpBody(
        chimps[i].position,
        chimps[i].velocity,
        chimps[i].gravity,
        chimps[i].angle,
        chimps[i].rotationSpeed,
        chimps[i].scale
      );
      chimps.splice(i, 1);
    }

    else if (isOffScreen(chimps[i].position.y)) {
      chimps.splice(i, 1);
    }
  }

  for (let i = bodyParts.length - 1; i >= 0; i--) {
    bodyParts[i].update();
    bodyParts[i].draw();
    if (isOffScreen(bodyParts[i].position.y)) {
      bodyParts.splice(i, 1);
    }
  }
}

function spawnChimpBody(
  chimpPosition,
  chimpVelocity,
  chimpGravity,
  chimpAngle,
  chimpRotationSpeed,
  chimpScale
) {
  bodyParts.push(
    head = new ChimpBodyParts(
      chimpPosition,
      chimpVelocity,
      chimpGravity,
      chimpAngle,
      chimpRotationSpeed,
      chimpScale,
      deadChimpHeadSprite
    )
  );

  bodyParts.push(
    body = new ChimpBodyParts(
      chimpPosition,
      createVector(chimpVelocity.x * -1, chimpVelocity.y),
      chimpGravity,
      chimpAngle,
      chimpRotationSpeed * -1,
      chimpScale,
      deadChimpBodySprite
    )
  );
}

function isOffScreen(y) {
  return y > height;
};

function drawDebugInfo() {
  push();
  text("num_chimps:" + chimps.length, 0, 10);
  text("num_bodyParts:" + bodyParts.length, 0, 25);
  pop();
}