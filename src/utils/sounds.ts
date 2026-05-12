let ctx: AudioContext | null = null;

const getCtx = () => {
  if (!ctx) {
    ctx = new AudioContext();
  }
  return ctx;
};

const playTone = (frequency: number, duration: number, type: OscillatorType = "sine") => {
  try {
    const audio = getCtx();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + duration);
  } catch {
    // Audio not available
  }
};

export const playCorrect = () => {
  playTone(880, 0.15);
};

export const playWrong = () => {
  playTone(220, 0.25, "square");
};

export const playWin = () => {
  playTone(523, 0.15);
  setTimeout(() => playTone(659, 0.15), 150);
  setTimeout(() => playTone(784, 0.3), 300);
};

export const playLose = () => {
  playTone(440, 0.3);
  setTimeout(() => playTone(349, 0.3), 300);
  setTimeout(() => playTone(262, 0.4), 600);
};
