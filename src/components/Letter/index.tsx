import styles from "./styles.module.css";

type LetterProps = {
  value?: string;
  size?: "default" | "small";
  color?: "default" | "correct" | "wrong";
};

export const Letter = ({
  value = "",
  size = "default",
  color = "default",
}: LetterProps) => {
  return (
    <div
      className={`
        ${styles.letter} 
        ${size === "small" && styles["letter-small"]} 
        ${color === "correct" && styles["letter-correct"]} 
        ${color === "wrong" && styles["letter-wrong"]} `}
    >
      <span>{value}</span>
    </div>
  );
};
