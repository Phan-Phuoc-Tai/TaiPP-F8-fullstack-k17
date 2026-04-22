import require from "canvas-confetti";

export default function congratulation() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    origin: {
      x: 0.61,
    },
  };
  require({
    ...defaults,
    particleCount: 140,
    scalar: 1.2,
    shapes: ["star"],
  });
}
