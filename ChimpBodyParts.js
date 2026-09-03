class ChimpBodyParts extends GameEntity {
    constructor(
        x,
        y,
        scale,
        chimpVelocity,
        sprite,
        rotationSpeedFactor = 1
    ) {
        super(x, y, sprite, scale);
        this.position = createVector(x, y);
        this.velocity = createVector(chimpVelocity.x * random(2, 4), random(-4, -8));
        this.rotationSpeed *= random(2, 5) * rotationSpeedFactor;
    }
}
