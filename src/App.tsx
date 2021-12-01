import styles from "./styles/App.module.css"
import NoUserLandingPage from "./components/NoUser_LandingPage/NoUserLandingPage";
import { useRecoilState } from "recoil";
import userState from "./atom"
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { gql, useQuery } from '@apollo/client';
import { useEffect } from "react";
import Sidebar from "./components/Siderbar/Siderbar";

const GET_USER = gql`
  query Query {
    currentUser {
      email
      age
      firstName
      lastName
    }
}`

const App = () => {

  const { data, loading } = useQuery(GET_USER);
  const [CurrentUser, setCurrentUser] = useRecoilState(userState)

  useEffect(()=> {
    if(data) {
      setCurrentUser(data)
    }
  },[data, setCurrentUser])

  return (
    <div className="container">
      {
      loading?
      <div></div>
      :
      !CurrentUser ?
      <div className={styles.test}>
        <NoUserLandingPage />
      </div> 
      :
      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Sidebar />
        </div>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
