import styles from "./styles/App.module.css"
import NoUserLandingPage from "./components/NoUser_LandingPage/NoUserLandingPage";
import { useRecoilState } from "recoil";
import userState from "./atom"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/LandingPage/Home";
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
        <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
      </Routes>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
