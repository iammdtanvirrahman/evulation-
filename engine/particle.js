export class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;

    this.mass = 1 + Math.random() * 2;
    this.energy = 50 + Math.random() * 50;
    this.temperature = Math.random();
  }
}