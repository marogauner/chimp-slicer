function Chimp(sprite) {
    this.sprite = sprite;
    this.x = width / 2;
    this.y = height - 10;
    this.vel_x;
    this.vel_y = 200;
}

Chimp.prototype.update = function() {
    const gravity = -1.0;
    const friction = 0.95;
}

Chimp.prototype.draw = function() {
    image(this.sprite, this.x, this.y);
}

