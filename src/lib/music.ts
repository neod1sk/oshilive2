export const MUSIC_SOURCE = "/audio/main-theme.mp3";

export const MUSIC_SEGMENTS_MS = [
  0,
  13000,
  27000,
  41000,
  55000,
  70000,
  85000
];

export const MUSIC_DURATION_MS = 96000;

let audioElement: HTMLAudioElement | null = null;

const ensureAudio = () => {
  if (!audioElement) {
    audioElement = new Audio(MUSIC_SOURCE);
    audioElement.preload = "auto";
    audioElement.crossOrigin = "anonymous";
    audioElement.loop = false;
    audioElement.volume = 0.85;
  }
  return audioElement;
};

export const playMusic = async () => {
  const audio = ensureAudio();
  audio.currentTime = 0;
  try {
    await audio.play();
  } catch (err) {
    console.warn("Failed to start background music", err);
  }
  return audio;
};

export const stopMusic = () => {
  if (!audioElement) return;
  audioElement.pause();
  audioElement.currentTime = 0;
};
