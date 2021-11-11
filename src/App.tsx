import styles from "./styles/App.module.css"
import ConnectedDots from "./components/Styling/ConnectedDots"

const App = () => {

  return (
    <div className={styles.test}>
      <ConnectedDots />
    </div>
  );
}

export default App;
