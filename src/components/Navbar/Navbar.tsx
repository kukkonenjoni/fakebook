import styles from "./Navbar.module.css"
import logo from "../StylingAndAnimations/download.svg"
import { FormEvent, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";


const Navbar = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    let users = searchParams.get("users");

    let navigate = useNavigate()

    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget);
        let newUser = formData.get("users") as string;
        if (!newUser) return;
        setSearchParams({ users: newUser });
    }

    useEffect(() => {
        if (!users) return
        if (users) {
            //navigate(`../friends`, {replace: true})
            navigate(`../search/?users=${users}`, {replace: true})
        }
    }, [users, navigate])

    return(
        <nav className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="Fakebook logo"/>
            <form className={styles.searchform} onSubmit={(e) => onSearch(e)}>
                <input className={styles.search} type="search" name="users"></input>
                <button type="submit" className={styles.searchbtn}>Search</button>
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