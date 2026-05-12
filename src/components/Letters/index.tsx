import { Letter } from "../Letter";
import styles from "./styles.module.css";

export const Letters = () => {
  return (
    <div className={styles.letters}>
      <h5>Letters</h5>

      <div>
        <Letter value="x" size="small" color="correct" />
        <Letter value="x" size="small" color="wrong" />
        <Letter value="x" size="small" color="wrong" />
        <Letter value="x" size="small" color="wrong" />
        <Letter value="x" size="small" color="wrong" />
      </div>
    </div>
  );
};
