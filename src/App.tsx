import { Header } from "./components/Header";
import styles from "./utils/App.module.css";

function App() {
  const handleOnRestart = () => {
    console.log("Restart");
  };

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleOnRestart} />
      </main>
    </div>
  );
}

export default App;
