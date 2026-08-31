class ChimpBodyParts {
    constructor(
        chimpPosition,
        chimpVelocity,
        chimpGravity,
        chimpAngle,
        chimpRotationSpeed,
        sprite
    ) {
        this.sprite = sprite;
        this.position = createVector(chimpPosition.x, chimpPosition.y);
        this.velocity = createVector(chimpVelocity.x * random(1.5, 3), random(-4, -8));
        this.gravity = chimpGravity;
        this.angle = chimpAngle;
        this.rotationSpeed = chimpRotationSpeed * random(2, 5);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.y += this.gravity;
        this.angle += this.rotationSpeed;
    }

    draw() {
        push(); // save current canvas coord state
        translate(this.position.x, this.position.y); // move origin to chimps position
        rotate(this.angle);
        imageMode(CENTER);
        image(this.sprite, 0, 0);
        pop();
    }
}