import { Particle } from './particle.js';
import { updatePhysics } from './physics.js';
import { updateChemistry } from './chemistry.js';

export class Universe {
  constructor(width, height, count = 600) {
    this.width = width;
    this.height = height;
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push(
        new Particle(
          Math.random() * width,
          Math.random() * height
        )
      );
    }
  }

  update() {
    updatePhysics(this.particles, this.width, this.height);
    updateChemistry(this.particles);
  }

  get totalEnergy() {
    return this.particles.reduce((s, p) => s + p.energy, 0);
  }

  get totalBonds() {
    return this.particles.reduce((s, p) => s + p.bonds.size, 0) / 2;
  }
}