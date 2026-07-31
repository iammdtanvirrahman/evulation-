export function render(ctx, particles, width, height) {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(2,4,10,0.18)';
  ctx.fillRect(0, 0, width, height);

  // Draw bonds first
  ctx.lineWidth = 1.2;

  for (const p of particles) {
    for (const bonded of p.bonds) {
      // Avoid drawing twice
      if (p.x < bonded.x) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(bonded.x, bonded.y);
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.stroke();
      }
    }
  }

  // Draw atoms
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2 + p.valence, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Glow effect for energetic atoms
    if (p.energy > 80) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6 + p.valence, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '22';
      ctx.fill();
    }
  }
}