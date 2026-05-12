import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { Letters } from "./components/Letters";
import { Tip } from "./components/Tip";
import styles from "./App.module.css";
import { useGame } from "./hooks/useGame";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useDarkMode } from "./hooks/useDarkMode";
import { fireWinConfetti } from "./utils/confetti";

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

  const { dark, toggle: toggleTheme } = useDarkMode();

  useFocusTrap(modalRef, showGameOver || showConfetti);

  useEffect(() => {
    if (showConfetti) {
      fireWinConfetti();
    }
  }, [showConfetti]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (showGameOver || showConfetti)) {
        startGame();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showGameOver, showConfetti, startGame]);

  const handleConfirm = useCallback(() => {
    if (!letter.trim()) {
      alert("Digite uma letra!");
      return;
    }
    confirmLetter(letter);
    setLetter("");
    inputRef.current?.focus();
  }, [letter, confirmLetter]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

  const lastGuess = letters[letters.length - 1];
  const guessResult = lastGuess
    ? lastGuess.correct
      ? "correta"
      : "incorreta"
    : null;

  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        {guessResult && `Letra ${lastGuess.value} ${guessResult}`}
        {showGameOver && `Fim de jogo. A palavra era ${challenge.word}`}
        {showConfetti && "Você venceu!"}
      </div>

      {(showGameOver || showConfetti) && (
        <div
          className={styles.overlay}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-title"
        >
          <div className={styles.modal}>
            <h2
              id="result-title"
              className={showConfetti ? styles["win-title"] : ""}
            >
              {showConfetti ? "Parab\u00e9ns!" : "Fim de jogo!"}
            </h2>
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
        <button
          className={styles["theme-toggle"]}
          onClick={toggleTheme}
          aria-label={dark ? "Tema claro" : "Tema escuro"}
        >
          {dark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
        </button>

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
