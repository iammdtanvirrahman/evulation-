const REPLICATION_ENERGY = 120;
const MUTATION_RATE = 0.02;

export function updateProtoLife(universe) {
  const newParticles = [];

  for (const p of universe.particles) {
    // A carbon atom with at least 2 bonds may act as a primitive replicator
    if (p.type === 'C' && p.bonds.size >= 2 && p.energy > REPLICATION_ENERGY) {
      if (Math.random() < 0.005) {
        const child = cloneParticle(p);

        // Spawn nearby
        child.x += (Math.random() - 0.5) * 20;
        child.y += (Math.random() - 0.5) * 20;

        // Split energy
        child.energy = p.energy * 0.4;
        p.energy *= 0.6;

        newParticles.push(child);
      }
    }
  }

  universe.particles.push(...newParticles);
}

function cloneParticle(parent) {
  const child = Object.create(Object.getPrototypeOf(parent));

  // Copy primitive properties
  child.x = parent.x;
  child.y = parent.y;

  child.vx = (Math.random() - 0.5) * 1.2;
  child.vy = (Math.random() - 0.5) * 1.2;

  child.type = mutateType(parent.type);

  child.mass = parent.mass;
  child.valence = parent.valence;
  child.color = parent.color;

  child.temperature = parent.temperature;

  // New organism starts with no bonds
  child.bonds = new Set();

  return child;
}

function mutateType(type) {
  if (Math.random() > MUTATION_RATE) return type;

  const types = ['H', 'O', 'N', 'C'];
  return types[Math.floor(Math.random() * types.length)];
}