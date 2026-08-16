import * as THREE from "three";

export function generateGalaxy(config) {
  const positions = new Float32Array(config.count * 3);
  const colors = new Float32Array(config.count * 3);

  const insideColor = new THREE.Color(config.insideColor);
  const outsideColor = new THREE.Color(config.outsideColor);

  for (let i = 0; i < config.count; i++) {
    const i3 = i * 3;

    // Power distributionconcentrates stars toward arms & core for ultra-high density
    const radius = Math.pow(Math.random(), 1.35) * config.radius;

    const branchAngle =
      ((i % config.branches) / config.branches) * Math.PI * 2;

    const spinAngle = radius * config.spin;

    const randomX =
      Math.pow(Math.random(), config.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      config.randomness *
      radius;

    const randomY =
      Math.pow(Math.random(), config.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      config.randomness *
      0.2;

    const randomZ =
      Math.pow(Math.random(), config.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      config.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / config.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  return {
    positions,
    colors,
  };
}