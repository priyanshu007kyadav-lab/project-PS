import { gsap } from "gsap";

let audioInstance = null;
let audioCtx = null;
let analyserNode = null;
let dataArray = null;

let isMuted = false;
let isPlaying = false;
const listeners = new Set();

const audioMetrics = { bass: 0, mid: 0, treble: 0, overall: 0 };

function notify() {
  const state = { isMuted, isPlaying };
  listeners.forEach((fn) => fn(state));
}

export function subscribeAudioStore(listener) {
  listeners.add(listener);
  listener({ isMuted, isPlaying });
  return () => listeners.delete(listener);
}

export function initAudio() {
  if (!audioInstance) {
    audioInstance = new Audio("/1.mp3");
    audioInstance.loop = true;
    audioInstance.volume = 0;
  }
}

export function setupAudioAnalyser() {
  if (analyserNode || !audioInstance) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = new AudioContextClass();
    const source = audioCtx.createMediaElementSource(audioInstance);
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 64;
    analyserNode.smoothingTimeConstant = 0.8;
    source.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
    dataArray = new Uint8Array(analyserNode.frequencyBinCount);
  } catch (err) {
    console.warn("AudioContext setup notice:", err);
  }
}

export function playBackgroundAudio() {
  initAudio();
  if (audioInstance) {
    setupAudioAnalyser();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    audioInstance.currentTime = 0;
    audioInstance
      .play()
      .then(() => {
        isPlaying = true;
        notify();
        // Smooth 2.2s volume fade-in from 0 to 0.75
        gsap.to(audioInstance, {
          volume: 0.75,
          duration: 2.2,
          ease: "power2.out",
        });
      })
      .catch((err) => {
        console.warn("Audio playback issue:", err);
      });
  }
}

export function toggleAudioMute() {
  if (!audioInstance) return;
  isMuted = !isMuted;
  audioInstance.muted = isMuted;
  notify();
}

export function getAudioData() {
  if (!analyserNode || !dataArray || isMuted || !isPlaying) {
    audioMetrics.bass *= 0.9;
    audioMetrics.mid *= 0.9;
    audioMetrics.treble *= 0.9;
    audioMetrics.overall *= 0.9;
    return audioMetrics;
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  analyserNode.getByteFrequencyData(dataArray);

  // Calculate Bass (bins 0-3), Mid (bins 4-15), Treble (bins 16-31)
  let bassSum = 0;
  for (let i = 0; i < 4; i++) bassSum += dataArray[i];
  const targetBass = bassSum / (4 * 255);

  let midSum = 0;
  for (let i = 4; i < 16; i++) midSum += dataArray[i];
  const targetMid = midSum / (12 * 255);

  let trebleSum = 0;
  for (let i = 16; i < 32; i++) trebleSum += dataArray[i];
  const targetTreble = trebleSum / (16 * 255);

  const targetOverall = (targetBass + targetMid + targetTreble) / 3;

  // Smooth lerp for liquid reactivity
  audioMetrics.bass += (targetBass - audioMetrics.bass) * 0.3;
  audioMetrics.mid += (targetMid - audioMetrics.mid) * 0.3;
  audioMetrics.treble += (targetTreble - audioMetrics.treble) * 0.3;
  audioMetrics.overall += (targetOverall - audioMetrics.overall) * 0.3;

  return audioMetrics;
}
