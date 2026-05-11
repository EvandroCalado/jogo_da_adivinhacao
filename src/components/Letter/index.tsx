import styles from "./styles.module.css";

type LetterProps = {
  value?: string;
};

export const Letter = ({ value = "" }: LetterProps) => {
  return (
    <div className={styles.letter}>
      <span>{value}</span>
    </div>
  );
};
