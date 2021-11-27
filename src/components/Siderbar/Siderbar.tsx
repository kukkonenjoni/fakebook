import styles from "./Sidebar.module.css"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"

const Sidebar = () => {

    const { pathname } = useLocation()
    console.log(useLocation())

    return(
        <div className={styles.sidebar}>
            <h1 className={styles.display} style={{borderBottom: pathname === "/" ? "red 2px solid" : ""}}>
                <Link to="/">
                    Main
                </Link>
            </h1>
            <h1 className={styles.display} style={{borderBottom: pathname === "/about" ? "red 2px solid" : ""}}>
                <Link to="/about">
                    Friends
                </Link>
            </h1>
        </div>
    )
}

export default Sidebar