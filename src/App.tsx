import { useRef, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { Letters } from "./components/Letters";
import { Tip } from "./components/Tip";
import styles from "./App.module.css";
import { useGame } from "./hooks/useGame";

function App() {
  const [letter, setLetter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    letters,
    attempts,
    showConfetti,
    showGameOver,
    challenge,
    maxAttempts,
    normalizedWord,
    startGame,
    handleRestart,
    confirmLetter,
  } = useGame();

  const handleConfirm = () => {
    if (!letter.trim()) {
      alert("Digite uma letra!");
      return;
    }
    confirmLetter(letter);
    setLetter("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

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
