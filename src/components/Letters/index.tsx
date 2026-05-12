import { Letter } from "../Letter";
import styles from "./styles.module.css";

export type LetterType = {
  value: string;
  correct: boolean;
};

type LettersProps = {
  letters: LetterType[];
};

export const Letters = ({ letters }: LettersProps) => {
  return (
    <div className={styles.letters}>
      <h5>Letras utilizadas</h5>

      <div>
        {letters.map((letter) => (
          <Letter
            key={letter.value}
            value={letter.value}
            size="small"
            color={letter.correct ? "correct" : "wrong"}
          />
        ))}
      </div>
    </div>
  );
};
