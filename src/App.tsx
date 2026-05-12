import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { Tip } from "./components/Tip";
import styles from "./utils/App.module.css";

function App() {
  const handleOnRestart = () => {
    console.log("Restart");
  };

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleOnRestart} />
        <Tip tip="O número está entre 1 e 10." />

        <div className={styles.word}>
          <Letter value="r" />
          <Letter value="e" />
          <Letter value="a" />
          <Letter value="c" />
          <Letter value="t" />
        </div>

        <div>
          <h4>Palpite</h4>

          <div className={styles.guess}>
            <Input autoFocus maxLength={1} placeholder="?" />
            <Button>Confirmar</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
