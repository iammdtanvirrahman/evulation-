import { Universe } from './engine/universe.js';
import { render } from './engine/renderer.js';

const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

const universe = new Universe(canvas.width, canvas.height, 800);

const particleCount = document.getElementById('particleCount');
const energyCount = document.getElementById('energyCount');

function loop() {
  universe.width = canvas.width;
  universe.height = canvas.height;

  universe.update();
  render(ctx, universe.particles, canvas.width, canvas.height);

  particleCount.textContent = universe.particles.length;
  energyCount.textContent = Math.floor(universe.totalEnergy);

  requestAnimationFrame(loop);
}

loop();