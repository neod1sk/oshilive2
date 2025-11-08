type AudioTrack = {
  context: AudioContext;
  buffer?: AudioBuffer;
};

let track: AudioTrack | null = null;

export const loadTrack = async (url: string) => {
  if (track) return track;
  const context = new AudioContext();
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = await context.decodeAudioData(arrayBuffer);
  track = { context, buffer };
  return track;
};

export const playMetronome = async (bpm: number) => {
  const context = track?.context ?? new AudioContext();
  const interval = 60 / bpm;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  osc.frequency.value = 880;
  gain.gain.value = 0.15;
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start();
  osc.stop(context.currentTime + 0.05);
  window.setTimeout(() => playMetronome(bpm), interval * 1000);
};

export const releaseAudio = () => {
  track?.context.close();
  track = null;
};



