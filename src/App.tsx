import { Header } from "./components/Header";
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
      </main>
    </div>
  );
}

export default App;
