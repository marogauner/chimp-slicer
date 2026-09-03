// sprites
let chimpSprite;
let deadChimpHeadSprite;
let deadChimpBodySprite;
let wheatCornSprite;
let bombExplosionSpritesheet;

let bombAnimations = [];
// ...
let chimps = [];
let bodyParts = [];
let slicer = new Slicer();
let bombs = [];
// spawning chimps
let lastSpawnTime = 0;
let spawnInterval = 3000;

//
let hp = 3;

function preload() {
  chimpSprite = loadImage("./assets/sprites/chimp.png");
  deadChimpHeadSprite = loadImage("./assets/sprites/deadChimpHead.png");
  deadChimpBodySprite = loadImage("./assets/sprites/deadChimpBody.png");
  bombSprite = loadImage("./assets/sprites/bomb.png");
  wheatCornSprite = loadImage("./assets/sprites/wheatCorn.png");
  bombExplosionSpritesheet = loadImage("./assets/sprites/bombexplosion.png");
}

function setup() {
  createCanvas(600, 400);
  frameRate(60);
  noCursor();
  noSmooth();

  createRestartButton();
  bombs.push(new Bomb(
    random(0, width),
    height,
    bombSprite,
    2
  ));
}

function draw() {
  background(200);
  chimpSpawner();
  updateChimps(slicer.trail);
  slicer.update();
  slicer.draw();
  updateBombExplosions();

  drawDebugInfo();
  drawHp();
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
    chimps.push(
      new Chimp(
        random(0, width),
        height,
        chimpSprite,
        1.5
      ));
  }
}

function createRestartButton() {
  let restartButton = createButton("restart");
  restartButton.position(width + 20, 10);
  restartButton.mousePressed(() => {
    spawnChimps(floor(random(5, 50)));
    bombs.push(new Bomb(
      random(0, width),
      height,
      bombSprite,
      2
    ));
  });
  restartButton.addClass("restart-button");
}

function updateChimps(mousePositions) {
  // update chimps
  for (let i = chimps.length - 1; i >= 0; i--) {
    chimps[i].update();
    chimps[i].draw();
    if (chimps[i].isCollidingWithMouse(mousePositions)) {
      spawnChimpBody(
        chimps[i].position.x,
        chimps[i].position.y,
        chimps[i].scale,
        chimps[i].velocity,
      );
      chimps.splice(i, 1);
    }

    else if (isOffScreen(chimps[i].position.y)) {
      chimps.splice(i, 1);
    }
  }

  // update BodyParts
  for (let i = bodyParts.length - 1; i >= 0; i--) {
    bodyParts[i].update();
    bodyParts[i].draw();
    if (isOffScreen(bodyParts[i].position.y)) {
      bodyParts.splice(i, 1);
    }
  }

  // update bombs
  for (let i = bombs.length - 1; i >= 0; i--) {
    bombs[i].update();
    bombs[i].draw();
    if (bombs[i].isCollidingWithMouse(mousePositions)) {
      let bombX = bombs[i].position.x;
      let bombY = bombs[i].position.y
      let bombScale = bombs[i].scale;
      bombs.splice(i, 1);
      hp--;
      bombAnimations.push(
        new AnimatedSprite(
          bombX,
          bombY,
          bombScale,
          32,
          bombExplosionSpritesheet,
          50
        )
      );
    }
    else if (isOffScreen(bombs[i].position.y)) {
      bombs.splice(i, 1);
    }
  }
}

function spawnChimpBody(
  x,
  y,
  scale,
  chimpVelocity,
) {
  bodyParts.push(
    head = new ChimpBodyParts(
      x,
      y,
      scale,
      chimpVelocity,
      deadChimpHeadSprite
    )
  );

  bodyParts.push(
    body = new ChimpBodyParts(
      x,
      y,
      scale,
      createVector(chimpVelocity.x * -1, chimpVelocity.y),
      deadChimpBodySprite,
      -1, // rotationSpeed factor
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
  text("num_bombs:" + bombs.length, 0, 40);
  pop();
}

function drawHp() {
  push();
  if (hp <= 0) return;
  for (let i = 0; i < hp; i++) {
    image(
      wheatCornSprite,
      width - (wheatCornSprite.width * (i+1)),
      10,
    );
  }
  pop();
}

function updateBombExplosions() {
  for (let i = bombAnimations.length - 1; i >= 0; i--) {
    bombAnimations[i].update();
    bombAnimations[i].display();
    if (bombAnimations[i].finished) {
      bombAnimations.splice(i, 1);
    }
  }
}