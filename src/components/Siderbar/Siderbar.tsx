import styles from "./Sidebar.module.css"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import { Route, Routes } from "react-router-dom";
import Home from "../LandingPage/Home";
import Chatbar from "../Chatbar/Chatbar";
import Searchfriends from "../SearchFriends/Searchfriends";

const Sidebar = () => {

    const { pathname } = useLocation()

    return(
        <main className={styles.container}>
            <div className={styles.sidebar}>
                <h1 className={styles.display} style={{borderBottom: pathname === "/" ? "red 2px solid" : ""}}>
                    <Link to="/">Main</Link>
                </h1>
                <h1 className={styles.display} style={{borderBottom: pathname === "/friends" ? "red 2px solid" : ""}}>
                    <Link to="/friends">Friends</Link>
                </h1>
            </div>
            <Routes>
                <Route path="/search" element={<Searchfriends />} />
                <Route path="/" element={<Home />} />
                <Route path="/friends" element={<Searchfriends />} />
            </Routes>
            <Chatbar />
        </main>
    )
}

export default Sidebar