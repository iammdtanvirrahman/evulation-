import { ATOMS, ATOM_KEYS } from './atomTypes.js';

export class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;

    // Random atom type
    this.type = ATOM_KEYS[Math.floor(Math.random() * ATOM_KEYS.length)];

    const atom = ATOMS[this.type];

    this.mass = atom.mass;
    this.valence = atom.valence;
    this.color = atom.color;

    this.energy = 50 + Math.random() * 50;
    this.temperature = Math.random();

    // Chemistry
    this.bonds = new Set();
  }

  get freeValence() {
    return this.valence - this.bonds.size;
  }
}