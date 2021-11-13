import styles from "./styles/App.module.css"
import NoUserLandingPage from "./components/NoUser_LandingPage/NoUserLandingPage";

const App = () => {

  return (
    <div className={styles.test}>
      <NoUserLandingPage />
    </div>
  );
}

export default App;
