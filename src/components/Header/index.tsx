import styles from "./styles.module.css";
import Restart from "../../assets/restart.svg";

type HeaderProps = {
  current: number;
  max: number;
  onRestart: () => void;
};

export const Header = ({ current, max, onRestart }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles["header-title"]}>
        <span>Projeto</span>
        <h1>Família em Ação</h1>
      </div>

      <div className={styles.restart}>
        <span>
          <strong>{current}</strong> de {max} tentativas
        </span>

        <button onClick={onRestart}>
          <img src={Restart} alt="Reiniciar jogo" />
        </button>
      </div>
    </header>
  );
};
