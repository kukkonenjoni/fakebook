import styles from "./Navbar.module.css"
import logo from "../StylingAndAnimations/download.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return(
        <nav className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="Fakebook logo"/>
            <form className={styles.searchform}>
                <input className={styles.search} type="search"></input>
                <button className={styles.searchbtn}>Search</button>
            </form>
            <div className={styles.navicons}>
                <h1 className={styles.navtext}>Messages</h1>
                <h1 className={styles.navtext}>Profile</h1>
                <h1 className={styles.navtext}>Log Out</h1>
            </div>
        </nav>
    )
}

export default Navbar