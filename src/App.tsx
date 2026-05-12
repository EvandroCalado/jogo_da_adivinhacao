import { useRef, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { Letters, type LetterType } from "./components/Letters";
import { Tip } from "./components/Tip";
import styles from "./App.module.css";
import { WORDS, type Challenge } from "./utils/words";

const GUESS_FACTOR = 1.7;

const pickRandomWord = (): Challenge => {
  const index = Math.floor(Math.random() * WORDS.length);
  return WORDS[index];
};

function App() {
  const [letter, setLetter] = useState("");
  const [letters, setLetters] = useState<LetterType[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [challenge, setChallenge] = useState<Challenge>(pickRandomWord);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const maxAttempts = Math.round((challenge.word.length ?? 0) * GUESS_FACTOR);

  const startGame = () => {
    setChallenge(pickRandomWord());
    setLetter("");
    setLetters([]);
    setScore(0);
    setAttempts(0);
    setShowConfetti(false);
    setShowGameOver(false);
    inputRef.current?.focus();
  };

  const handleRestart = () => {
    if (attempts > 0 && !showGameOver && !showConfetti) {
      setShowGameOver(true);
    } else {
      startGame();
    }
  };

  const handleConfirm = () => {
    if (!letter.trim()) {
      alert("Digite uma letra!");
      return;
    }

    const value = letter
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLocaleUpperCase("pt-BR");

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const existsLetter = letters.find((l) => l.value === value);

    if (existsLetter) {
      if (newAttempts >= maxAttempts) {
        setShowGameOver(true);
      }
      setLetter("");
      inputRef.current?.focus();
      return;
    }

    const normalizedWord = challenge.word
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLocaleUpperCase("pt-BR");

    const hit = normalizedWord
      .split("")
      .filter((char) => char === value).length;
    const correct = hit > 0;
    const currentScore = score + hit;
    const updatedLetters = [...letters, { value, correct }];

    setLetters(updatedLetters);
    setScore(currentScore);
    setLetter("");

    if (currentScore >= challenge.word.length && currentScore > 0) {
      setShowConfetti(true);
      return;
    }

    if (newAttempts >= maxAttempts) {
      setShowGameOver(true);
    }

    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

  const normalizedWord = challenge.word
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleUpperCase("pt-BR");

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={startGame}
        />
      )}
      {showGameOver && (
        <div
          className={styles.overlay}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gameover-title"
        >
          <div className={styles.modal}>
            <h2 id="gameover-title">Fim de jogo!</h2>
            <p>
              A palavra era: <strong>{challenge.word.toUpperCase()}</strong>
            </p>
            <button className={styles.button} onClick={startGame} autoFocus>
              Jogar novamente
            </button>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <main>
          <Header
            current={attempts}
            max={maxAttempts}
            onRestart={handleRestart}
          />
          <Tip tip={challenge.tip} />

          <div className={styles.word}>
            {challenge.word.split("").map((char, index) => {
              const normalizedChar = normalizedWord[index];
              const found = letters.find((l) => l.value === normalizedChar);

              return (
                <Letter
                  key={char + index}
                  value={found?.value}
                  color={found?.correct ? "correct" : "default"}
                />
              );
            })}
          </div>

          <div>
            <h4>Palpite</h4>

            <div className={styles.guess}>
              <Input
                ref={inputRef}
                aria-label="Digite uma letra"
                autoFocus
                maxLength={1}
                placeholder="?"
                value={letter}
                onChange={(event) => setLetter(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={handleConfirm}>Confirmar</Button>
            </div>
          </div>

          <Letters letters={letters} />
        </main>

        <a
          href="https://github.com/EvandroCalado"
          rel="noopener noreferrer"
          target="_blank"
        >
          Feito com ♥ por Evandro Calado
        </a>
      </div>
    </>
  );
}

export default App;
