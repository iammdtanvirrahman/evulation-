export function updateProtoLife(universe) {
  const newParticles = [];

  for (const p of universe.particles) {
    // Carbon atom with enough energy may replicate
    if (p.type === 'C' && p.energy > 90) {
      if (Math.random() < 0.002) {
        const child = { ...p };

        child.x = p.x + (Math.random() - 0.5) * 30;
        child.y = p.y + (Math.random() - 0.5) * 30;

        child.vx = (Math.random() - 0.5) * 1;
        child.vy = (Math.random() - 0.5) * 1;

        child.energy = p.energy * 0.4;
        p.energy *= 0.6;

        child.bonds = new Set();

        newParticles.push(child);
      }
    }
  }

  universe.particles.push(...newParticles);
}