import { useEffect, useMemo, useState } from "react";
import type { LetterType } from "../components/Letters";
import { WORDS, type Challenge } from "../utils/words";
import { normalizeWord } from "../utils/normalize";

const GUESS_FACTOR = 1.7;

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

  const maxAttempts = Math.round((challenge.word.length ?? 0) * GUESS_FACTOR);
  const normalizedWord = useMemo(() => normalizeWord(challenge.word), [challenge.word]);

  const startGame = () => {
    setChallenge(pickRandomWord());
    setLetters([]);
    setScore(0);
    setAttempts(0);
    setShowConfetti(false);
    setShowGameOver(false);
  };

  const confirmLetter = (rawLetter: string) => {
    const value = normalizeWord(rawLetter);
    if (!value) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const existsLetter = letters.find((l) => l.value === value);

    if (existsLetter) {
      if (newAttempts >= maxAttempts) {
        setShowGameOver(true);
      }
      return;
    }

    const normalized = normalizeWord(challenge.word);
    const hit = normalized.split("").filter((char) => char === value).length;
    const correct = hit > 0;
    const currentScore = score + hit;
    const updatedLetters = [...letters, { value, correct }];

    setLetters(updatedLetters);
    setScore(currentScore);

    if (currentScore >= challenge.word.length && currentScore > 0) {
      setShowConfetti(true);
      return;
    }

    if (newAttempts >= maxAttempts) {
      setShowGameOver(true);
    }
  };

  useEffect(() => {
    if (attempts >= maxAttempts && score < challenge.word.length && !showConfetti) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowGameOver(true);
    }
  }, [attempts, maxAttempts, score, challenge.word.length, showConfetti]);

  const handleRestart = () => {
    if (attempts > 0 && !showGameOver && !showConfetti) {
      setShowGameOver(true);
    } else {
      startGame();
    }
  };

  const handleGiveUp = () => {
    if (attempts > 0 && !showGameOver && !showConfetti) {
      setShowGameOver(true);
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
    handleGiveUp,
    confirmLetter,
  };
}
