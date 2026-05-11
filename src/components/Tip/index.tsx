import styles from "./styles.module.css";
import TipIcon from "../../assets/tip.svg";

type TipProps = {
  tip: string;
};

export const Tip = ({ tip }: TipProps) => {
  return (
    <div className={styles.tip}>
      <img src={TipIcon} alt="Dica" />

      <div>
        <h3>Dica: </h3>
        <p>{tip}</p>
      </div>
    </div>
  );
};
