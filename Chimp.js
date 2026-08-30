function Chimp(x, y, sprite) {
    this.sprite = sprite;
    this.position = createVector(x, y);
    this.velocity = createVector(randomVelocityX(x), random(-9, -12));
    this.gravity = random(0.2, 0.25);
    this.angle = random(0, TWO_PI);
    if (this.velocity.x >= 0) {
        this.rotationSpeed = random(0, 0.05)
    } else {
        this.rotationSpeed = random(-0.05, 0);
    }
    this.radius = 16;
    this.debug = true;
    if (this.debug) {
        this.collisionCircle = circle(this.position.x, this.position.y, this.radius*2);
    }
}

Chimp.prototype.update = function() {
    this.position.add(this.velocity);
    this.velocity.y += this.gravity;
    this.angle += this.rotationSpeed;
    if (this.debug) {
        this.collisionCircle = circle(this.position.x, this.position.y, this.radius*2);
    }
}

Chimp.prototype.draw = function() {
    push();  // save current canvas coord state
    translate(this.position.x, this.position.y); // move origin to chimps position
    rotate(this.angle);
    imageMode(CENTER);
    image(this.sprite, 0, 0);
    pop();
}

function randomVelocityX(x) {
    if (x <= width / 2) {
        return random(0.5, 2);
    }
    else {
        return random(-2, -0.5);
    }
}

Chimp.prototype.isCollidingWithMouse = function() {
    let distance = dist(mouseX, mouseY, this.position.x, this.position.y);
    return distance < this.radius;
}