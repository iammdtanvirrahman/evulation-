export function render(ctx, particles, width, height) {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "rgba(2, 4, 10, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const p of particles) {
    const glow = Math.min(255, Math.floor(p.energy * 2));

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.mass + 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${glow}, ${120 + glow / 3}, 255)`;
    ctx.fill();
  }
}