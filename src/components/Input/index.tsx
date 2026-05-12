import type { ComponentProps } from "react";
import styles from "./styles.module.css";

type InputProps = ComponentProps<"input">;

export const Input = ({ ...rest }: InputProps) => {
  return <input className={styles.input} {...rest} />;
};
