class Slicer {
  constructor() {
    this.trail = [];
  }
  update() {
    this.trail.push({ x: mouseX, y: mouseY });
    if (this.trail.length >= 30) {
      this.trail.shift();
    }
  }
  draw() {
    if (this.trail.length < 2) return;
    push();
    for (let i = 0; i < this.trail.length - 1; i++) {
      let p1 = this.trail[i];
      let p2 = this.trail[i + 1];

      // Calculate progress along the trail (0.0 at tail, 1.0 at tip)
      let pct = i / (this.trail.length - 1);

      // 1. Taper thickness: Thin at tail, thick at tip
      let strokeW = map(pct, 0, 1, 1, 12);

      // 2. Fade opacity: Transparent at tail, bright at tip
      let alpha = map(pct, 0, 1, 0, 255);

      // Style the blade line (Cyan glow effect)
      stroke(0, 0, 0, alpha);
      strokeWeight(strokeW);
      strokeCap(SQUARE);

      line(p1.x, p1.y, p2.x, p2.y);
    }

    for (let i = 0; i < this.trail.length - 1; i++) {
      let p1 = this.trail[i];
      let p2 = this.trail[i + 1];

      // Calculate progress along the trail (0.0 at tail, 1.0 at tip)
      let pct = i / (this.trail.length - 1);

      // 1. Taper thickness: Thin at tail, thick at tip
      let strokeW = map(pct, 0, 1, 1, 8);

      // 2. Fade opacity: Transparent at tail, bright at tip
      let alpha = map(pct, 0, 1, 0, 255);

      // Style the blade line (Cyan glow effect)
      stroke(255, 255, 255, alpha);
      strokeWeight(strokeW);
      strokeCap(SQUARE);

      line(p1.x, p1.y, p2.x, p2.y);
    }
    pop();
    if (this.debug) {
      this.drawCollisionBox();
    }
  }
}



