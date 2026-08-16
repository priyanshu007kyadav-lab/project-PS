export const moonOrbit = {
  enabled: false,
  radius: 8,
  speed: 0.08,
  angle: 0,
};

export function startMoonOrbit() {
  moonOrbit.enabled = true;
}

export function stopMoonOrbit() {
  moonOrbit.enabled = false;
  moonOrbit.angle = 0;
}