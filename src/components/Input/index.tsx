import { forwardRef, type ComponentProps } from "react";
import styles from "./styles.module.css";

type InputProps = ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    return <input ref={ref} className={styles.input} {...rest} />;
  },
);
