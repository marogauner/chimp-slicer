class ChimpBodyParts {
    constructor(
        chimpPosition,
        chimpVelocity,
        chimpGravity,
        chimpAngle,
        chimpRotationSpeed,
        chimpScale,
        sprite
    ) {
        this.sprite = sprite;
        this.position = createVector(chimpPosition.x, chimpPosition.y);
        this.velocity = createVector(chimpVelocity.x * random(2, 4), random(-4, -8));
        this.gravity = chimpGravity;
        this.angle = chimpAngle;
        this.rotationSpeed = chimpRotationSpeed * random(2, 5);
        this.scale = chimpScale;
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
        image(
            this.sprite,
            0,
            0,
            this.sprite.width * this.scale,
            this.sprite.height * this.scale
        );
        pop();
    }
}