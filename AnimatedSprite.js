class AnimatedSprite {
    constructor(x, y, scale, frameSize, spritesheet, speed, loop = false) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.frameSize = frameSize;
        this.spritesheet = spritesheet;
        this.speed = speed;
        this.lastMillis = millis();
        this.numFrames = floor(spritesheet.width / frameSize);
        this.currentFrame = 0;
        this.finished = false;
        this.loop = loop;
    }

    update() {
        if (this.finished) return;

        let elapsedTime = millis() - this.lastMillis;
        if (elapsedTime >= this.speed) {
            this.lastMillis = millis();
            this.currentFrame++;
            if (this.currentFrame >= this.numFrames) {
                if (this.loop) {
                    this.currentFrame = 0;
                }
                else {
                    this.finished = true;
                }
            }
        }
    }

    display() {
        if (this.finished) return;

        let sx = this.currentFrame * this.frameSize;
        let sy = 0; // if spritesheet only has 1 row
        push();
        imageMode(CENTER);
        image(
            this.spritesheet, 
            this.x, this.y, this.frameSize * this.scale, this.frameSize * this.scale, // Wo und wie groß im Spiel
            sx, sy, this.frameSize, this.frameSize // Welcher Ausschnitt vom Spritesheet
        );
        pop();
    }
}