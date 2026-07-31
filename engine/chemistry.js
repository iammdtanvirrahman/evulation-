const BOND_DISTANCE = 14;
const BREAK_PROBABILITY = 0.0002;

export function updateChemistry(particles) {
  // Form bonds
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];

    if (a.freeValence <= 0) continue;

    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];

      if (b.freeValence <= 0) continue;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);

      if (dist < BOND_DISTANCE) {
        // Simple chemistry rules
        if (canBond(a, b)) {
          a.bonds.add(b);
          b.bonds.add(a);

          // Bond releases energy
          a.energy += 5;
          b.energy += 5;
        }
      }
    }
  }

  // Occasionally break unstable bonds
  for (const p of particles) {
    for (const bonded of [...p.bonds]) {
      if (Math.random() < BREAK_PROBABILITY) {
        p.bonds.delete(bonded);
        bonded.bonds.delete(p);
      }
    }
  }
}

function canBond(a, b) {
  // Already bonded
  if (a.bonds.has(b)) return false;

  // Hydrogen can't bond to too many heavy atoms indirectly
  if (a.type === 'H' && b.type === 'H') {
    return Math.random() < 0.2;
  }

  // Carbon is very reactive
  if (a.type === 'C' || b.type === 'C') return true;

  // Oxygen likes H and C
  if (a.type === 'O' && (b.type === 'H' || b.type === 'C')) return true;
  if (b.type === 'O' && (a.type === 'H' || a.type === 'C')) return true;

  // Nitrogen bonds with many things
  if (a.type === 'N' || b.type === 'N') return Math.random() < 0.6;

  return Math.random() < 0.3;
}