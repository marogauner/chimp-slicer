class GameEntity {
  constructor(x, y, sprite, scale) {
    this.sprite = sprite;
    this.position = createVector(x, y);
    this.velocity = createVector(randomVelocityX(x), random(-9, -12));
    this.gravity = random(0.2, 0.25);
    this.angle = random(0, TWO_PI);
    this.scale = scale;
    if (this.velocity.x >= 0) {
      this.rotationSpeed = random(0, 0.05);
    } else {
      this.rotationSpeed = random(-0.05, 0);
    }
    this.radius = 32;
    this.debug = false;
    if (this.debug) {
      this.collisionCircle = circle(
        this.position.x,
        this.position.y,
        this.radius * 2
      );
    }
  }
  update() {
    this.position.add(this.velocity);
    this.velocity.y += this.gravity;
    this.angle += this.rotationSpeed;
    if (this.debug) {
      this.collisionCircle = circle(
        this.position.x,
        this.position.y,
        this.radius * 2
      );
    }
  }
  draw() {
    push(); // save current canvas coord state
    translate(this.position.x, this.position.y); // move origin to chimps position
    rotate(this.angle);
    imageMode(CENTER);
    image(
      this.sprite,
      0,
      0,
      this.sprite.width * this.scale,
      this.sprite.height * this.scale
    );
    pop();
  }
  isCollidingWithMouse(mousePositions) {
    if (!mousePositions) return false;
    let collisionTrail = mousePositions.slice(-3);
    
    return collisionTrail.some(element => {
      let distance = dist(element.x, element.y, this.position.x, this.position.y);
      return distance < this.radius;
    });
  }
}

function randomVelocityX(x) {
  if (x <= width / 2) {
    return random(0.5, 2);
  } else {
    return random(-2, -0.5);
  }
}