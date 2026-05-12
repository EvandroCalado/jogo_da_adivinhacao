import type { ComponentProps } from "react";
import styles from "./styles.module.css";

type ButtonProps = ComponentProps<"button">;

export const Button = ({ ...rest }: ButtonProps) => {
  return <button className={styles.button} {...rest} />;
};
