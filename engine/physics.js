const G = 0.002;
const MAX_SPEED = 3;

export function updatePhysics(particles, width, height) {
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];

    // Random thermal motion
    a.vx += (Math.random() - 0.5) * 0.05;
    a.vy += (Math.random() - 0.5) * 0.05;

    // Weak attraction between nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distSq = dx * dx + dy * dy + 0.01;

      if (distSq < 900) {
        const force = G * a.mass * b.mass / distSq;

        a.vx += force * dx;
        a.vy += force * dy;

        b.vx -= force * dx;
        b.vy -= force * dy;
      }
    }

    // Speed limit
    const speed = Math.hypot(a.vx, a.vy);
    if (speed > MAX_SPEED) {
      a.vx = (a.vx / speed) * MAX_SPEED;
      a.vy = (a.vy / speed) * MAX_SPEED;
    }

    // Move
    a.x += a.vx;
    a.y += a.vy;

    // Bounce from walls
    if (a.x < 0 || a.x > width) a.vx *= -1;
    if (a.y < 0 || a.y > height) a.vy *= -1;

    a.x = Math.max(0, Math.min(width, a.x));
    a.y = Math.max(0, Math.min(height, a.y));

    // Energy slowly dissipates
    a.energy *= 0.9995;
  }
}