import { useMemo, useState } from "react";
import type { LetterType } from "../components/Letters";
import { WORDS, type Challenge } from "../utils/words";
import { normalizeWord } from "../utils/normalize";
import { playCorrect, playWrong, playWin, playLose } from "../utils/sounds";

const GUESS_FACTOR = 1.7;
const MAX_UNIQUE = 26;

const pickRandomWord = (): Challenge => {
  const index = Math.floor(Math.random() * WORDS.length);
  return WORDS[index];
};

export function useGame() {
  const [letters, setLetters] = useState<LetterType[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [challenge, setChallenge] = useState<Challenge>(pickRandomWord);

  const maxAttempts = Math.min(
    MAX_UNIQUE,
    Math.round((challenge.word.length ?? 0) * GUESS_FACTOR),
  );
  const normalizedWord = useMemo(
    () => normalizeWord(challenge.word),
    [challenge.word],
  );
  const totalLetters = useMemo(
    () => normalizedWord.replace(/[^A-Z]/g, "").length,
    [normalizedWord],
  );

  const startGame = () => {
    setChallenge(pickRandomWord());
    setLetters([]);
    setScore(0);
    setAttempts(0);
    setShowConfetti(false);
    setShowGameOver(false);
  };

  const confirmLetter = (rawLetter: string) => {
    if (showGameOver || showConfetti) return;
    const value = normalizeWord(rawLetter);
    if (!value) return;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    const existsLetter = letters.find((l) => l.value === value);

    if (existsLetter) {
      playWrong();
      if (nextAttempts >= maxAttempts) {
        setShowGameOver(true);
        playLose();
      }
      return;
    }

    const hit = normalizedWord
      .split("")
      .filter((char) => char === value).length;
    const correct = hit > 0;
    const currentScore = score + hit;
    const updatedLetters = [...letters, { value, correct }];

    setLetters(updatedLetters);
    setScore(currentScore);

    if (correct) {
      playCorrect();
    } else {
      playWrong();
    }

    if (currentScore >= totalLetters && currentScore > 0) {
      setShowConfetti(true);
      playWin();
      return;
    }

    if (nextAttempts >= maxAttempts) {
      setShowGameOver(true);
      playLose();
    }
  };

  const handleRestart = () => {
    if (attempts > 0 && !showGameOver && !showConfetti) {
      setShowGameOver(true);
    } else {
      startGame();
    }
  };

  return {
    letters,
    score,
    attempts,
    showConfetti,
    showGameOver,
    challenge,
    maxAttempts,
    normalizedWord,
    startGame,
    handleRestart,
    confirmLetter,
  };
}
