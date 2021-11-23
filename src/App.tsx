import styles from "./styles/App.module.css"
import NoUserLandingPage from "./components/NoUser_LandingPage/NoUserLandingPage";
import { useRecoilState } from "recoil";
import userState from "./atom"

const App = () => {

  const [CurrentUser, setCurrentUser] = useRecoilState(userState)
  console.log(CurrentUser)

  return (
    <div>
    {
    !CurrentUser ?
    <div className={styles.test}>
      <NoUserLandingPage />
    </div> 
    :
    <div>
      <h1>Hello</h1>
    </div>
    }
    </div>
  );
}

export default App;
