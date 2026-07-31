import { Universe } from './engine/universe.js';
import { render } from './engine/renderer.js';

// Canvas setup
const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

// Create primordial universe
const universe = new Universe(canvas.width, canvas.height, 800);

// HUD elements
const particleCount = document.getElementById('particleCount');
const energyCount = document.getElementById('energyCount');
const bondCount = document.getElementById('bondCount');
const carbonCount = document.getElementById('carbonCount');

// Main simulation loop
function loop() {
  // Keep universe size synced with canvas
  universe.width = canvas.width;
  universe.height = canvas.height;

  // Update physics + chemistry + proto-life
  universe.update();

  // Render universe
  render(ctx, universe.particles, canvas.width, canvas.height);

  // Update HUD counters
  particleCount.textContent = universe.particles.length;
  energyCount.textContent = Math.floor(universe.totalEnergy);
  bondCount.textContent = Math.floor(universe.totalBonds);
  carbonCount.textContent = universe.carbonCount;

  // Continue simulation
  requestAnimationFrame(loop);
}

// Start ZeroGenesis
loop();