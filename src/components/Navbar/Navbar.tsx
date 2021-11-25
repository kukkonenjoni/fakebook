import styles from "./Navbar.module.css"
import logo from "../StylingAndAnimations/download.svg"

const Navbar = () => {
    return(
        <nav className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="Fakebook logo"/>
            <h1>Fakebook</h1>
        </nav>
    )
}

export default Navbar