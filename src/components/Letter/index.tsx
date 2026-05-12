import { useEffect, useRef, useState } from "react";
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
  const [animated, setAnimated] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (!prevValue.current && value) {
      setAnimated(true);
    }
    prevValue.current = value;
  }, [value]);

  return (
    <div
      className={`
        ${styles.letter}
        ${size === "small" && styles["letter-small"]}
        ${color === "correct" && styles["letter-correct"]}
        ${color === "wrong" && styles["letter-wrong"]}
        ${!value && styles["letter-hidden"]}
        ${animated && styles["letter-animated"]}`}
    >
      <span>{value || "_"}</span>
    </div>
  );
};
