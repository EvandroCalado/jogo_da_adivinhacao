import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { Letters, type LetterType } from "./components/Letters";
import { Tip } from "./components/Tip";
import styles from "./App.module.css";
import { WORDS, type Challenge } from "./utils/words";

function App() {
  const [letter, setLetter] = useState("");
  const [letters, setLetters] = useState<LetterType[]>([]);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(() => {
    const index = Math.floor(Math.random() * WORDS.length);
    return WORDS[index];
  });

  const startGame = () => {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    setChallenge(randomWord);
    setLetter("");
    setLetters([]);
    setScore(0);
    setShowConfetti(false);
    setShowGameOver(false);
  };

  const maxAttempts = Math.round((challenge?.word.length ?? 0) * 1.7);

  const handleConfirm = () => {
    if (!challenge) return;

    if (!letter.trim()) return alert("Digite uma letra!");

    const value = letter.toUpperCase();
    const existsLetter = letters.find(
      (letter) => letter.value.toUpperCase() === value,
    );

    if (existsLetter) {
      return alert(`A letra ${value} já foi utilizada!`);
    }

    const hit = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hit > 0;
    const currentScore = score + hit;

    setLetters((letter) => [
      ...letter,
      {
        value,
        correct,
      },
    ]);
    setScore(currentScore);
    setLetter("");
  };

  useEffect(() => {
    if (!challenge) return;

    setTimeout(() => {
      if (letters.length === maxAttempts) {
        setShowGameOver(true);
      }

      if (score === challenge.word.length && score > 0) {
        setShowConfetti(true);
      }
    }, 200);
  }, [score, letters, challenge, maxAttempts]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={() => {
            startGame();
          }}
        />
      )}
      {showGameOver && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Fim de jogo!</h2>
            <p>A palavra era: <strong>{challenge?.word.toUpperCase()}</strong></p>
            <button className={styles.button} onClick={startGame}>
              Jogar novamente
            </button>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <main>
          <Header
            current={letters.length}
            max={maxAttempts}
            onRestart={startGame}
          />
          {challenge && <Tip tip={challenge.tip} />}

          <div className={styles.word}>
            {challenge?.word.split("").map((letter, index) => {
              const found = letters.find(
                (char) => char.value === letter.toUpperCase(),
              );

              return (
                <Letter
                  key={letter + index}
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
                autoFocus
                maxLength={1}
                placeholder="?"
                value={letter}
                onChange={(event) => setLetter(event.target.value)}
              />
              <Button onClick={handleConfirm}>Confirmar</Button>
            </div>
          </div>

          <Letters letters={letters} />
        </main>
      </div>
    </>
  );
}

export default App;
